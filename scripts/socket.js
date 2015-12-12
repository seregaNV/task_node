
var config = require('config');
var connect = require('connect');
var cookieParser = require('cookie-parser');
var async = require('async');
var cookie = require('cookie');
var sessionStore = require('scripts/sessionStore');
var User = require('scripts/usersChat').User;


function loadSession(sid, callback) {
    sessionStore.load(sid, function(err, session) {
        if (arguments.length == 0) {
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
}

function loadUser(session, callback) {
    if (!session.user) {
        console.log('Session %s is anonymous', session.id);
        return callback(null, null);
    }
    console.log('retrieving user: ' + session.user);

    User.findById(session.user, function(err, user) {
        if (err) return callback(err);
        if (!user) {
            return callback(null, null);
        }
        console.log('user find by id result: ' + user);
        callback(null, user);
    });
}
module.exports = function(server) {
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*');

    io.use(function(socket, next) {
        var handshake = socket.request;
        async.waterfall([
            function(callback) {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.get('session:key')];
                var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
                //console.log(sid);
                loadSession(sid, callback);
            },
            function(session, callback) {
                if (!session) {
                    callback(new Error('NO session'));
                }
                handshake.session = session;
                loadUser(session, callback);
            },
            function(user, callback) {
                if (!user) {
                    callback(new Error('Anonymous session may not connect'));
                }
                handshake.user = user;
                callback(null);
            }
        ], function(err) {
            if (!err) {
                next();
            }
            //if (err instanceof Error) {
            //    return callback(null, false);
            //}
            //callback(err)
        });
    });
    //io.set('authorization', function (handshake, callback) {
    //});

    io.on('connection', function (socket) {
        //console.log('111111111111111111111111111111' + JSON.stringify(socket.handshake, null, 2));
        var username = socket.request.user.get('username');
        socket.broadcast.emit('join', username);
        socket.on('message', function (text, callback) {
            socket.broadcast.emit('message', username, text);
            callback && callback();
        });
        socket.on('disconnect', function() {
            socket.broadcast.emit('leave', username);
        });
    });
    return io;
};