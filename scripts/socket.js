
//var config = require('config');
var connect = require('connect');
var async = require('async');
var cookieParser = require('cookie-parser');
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
    //console.log(session);
    if (!session.user) {
        console.log('Session %s is anonymous', session.id);
        return callback(null, null);
    }
    //console.log('retrieving user: ' + session.user);

    User.findById(session.user, function(err, user) {
        if (err) return callback(err);
        if (!user) {
            return callback(null, null);
        }
        //console.log('user find by id result: ' + user);
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
                var sidCookie = handshake.cookies["sid"];
                var sid = cookieParser.signedCookie(sidCookie, "KillerIsJim");
                loadSession(sid, callback);
            },
            function(session, callback) {
                if (!session) {
                    callback(Error('NO session')); //new HttpError
                    return false; // ...
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



    io.on('session:reload', function(sid) {
        console.log(sid);
        console.log('--------------test_session:reload------------------------------------');
    });



    //socket.on('session:reload', function() {
    //    //var client = io.eio.clients[io];
    //    //var clients = io.sockets.clients();
    //    console.log('--------------test_session:reload------------------------------------');
    //    //console.log(sid);
    //    //var clients = io.sockets.clients();
    //    //clients.forEach(function(client) {
    //    //    if (client.handshake.session.id != sid) return;
    //    //    loadSession(sid, function(err, session) {
    //    //        if (err) {
    //    //            client.emit('error', 'server error');
    //    //            client.disconnect();
    //    //            return;
    //    //        }
    //    //        if (!session) {
    //    //            client.emit('error', 'username unauthorized');
    //    //            client.disconnect();
    //    //            return;
    //    //        }
    //    //        client.handshake.session = session;
    //    //    });
    //    //});
    //});

    io.on('connection', function (socket) {
        var username = socket.request.user.get('username');
        socket.broadcast.emit('join', username);
        socket.on('message', function (text, callback) {
            socket.broadcast.emit('message', username, text);
            callback && callback();
        });
        //socket.on('session:reload', function(sid) {
        //    console.log('--------------test_session:reload------------------------------------ ' + sid);
        //    //console.log(sid);
        //});
        socket.on('disconnect', function() {
            socket.broadcast.emit('leave', username);
        });
    });
    return io;
};