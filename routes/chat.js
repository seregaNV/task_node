var express = require('express');
var router = express.Router();
var User = require('scripts/usersChat').User;
var checkAuth = require('middleware/checkAuth');

router.get('/login-chat', function(req, res, next) {
    res.render('login-chat', {
        title: 'Authorization',
        jumbotitle: 'Authorization',
        jumbotext: 'Implementation of a chat with support sessions, the authorization and templating'
    });
});

router.post('/login-chat', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) return next(err); // err
        //if (err) {
        //    if (err instanceof AuthError) {
        //        return next(new HttpError(403, err.message))
        //    } else {
        //        return next(err);
        //    }
        //}
        req.session.user = user._id;
        res.send({});
    });
});

router.get('/chat', checkAuth, function(req, res, next) {
    res.render('chat', {
        title: 'Chat',
        jumbotitle: 'Chat',
        jumbotext: 'Implementation of a chat with support sessions, the authorization and templating'
    });
});



router.post('/logout', function(req, res, next) {
    var sid = req.session.id;
    var io = req.app.get('io');
    var location = req.get('referer');
    //var test = req.app.get('test');
    //console.log('--------------test------------------------------------   ' + test);
    req.session.destroy(function(err) {
        io.emit('session:reload', sid);
        if (err) return next(err);
        if (location == 'http://localhost:3000/chat') {
            res.redirect('/');
        } else {
            res.redirect(location);
        }
    });
});
//io.sockets.on('connect', function (socket) {
//    console.log('--------------test_1------------------------------------');
//    socket.emit('session:reload', sid);
//    console.log('--------------test_2------------------------------------');
//});
//router.post('/logout', function(req, res, next) {
//    var sid = req.session.id;
//    var io = req.app.get('io');
//    var keyyy = Object.keys(io.eio.clients);
//    var sessionStore = require('scripts/sessionStore');
//    var clients = io.eio.clients;
//    console.log('sid - ' + sid);
//    console.log('keyyy - ' + keyyy);
//    //console.log('clients.length - ' + clients.length);
//
//    var clientss;
//    var sidd;
//    var sess;
//
//        //if ( obj.hasOwnProperty(p) ) {
//        //    alert(p + '=' + obj[p]);
//        //}
//    //function loadSession(sid, callback) {
//    //    sessionStore.load(sid, function(err, session) {
//    //        if (arguments.length == 0) {
//    //            return callback(null, null);
//    //        } else {
//    //            return callback(null, session);
//    //        }
//    //    });
//    //}
//    for (var p in clients) {
//        clientss = clients[p].request.cookies.sid;
//        console.log('clientss ' + p + ' = ' + clientss);
//        sidd = clientss.slice(2, sid.length+2);
//        if (sidd == sid) {
//            console.log('-------------------------sidd------------------ ' + sidd);
//            sess = clients[p].request.session;
//            console.log('sess ' + p + ' = ' + sess);
//
//            //loadSession(sid, function(err, session) {
//            //    if (err) {
//            //        console.log('-------------------------1------------------');
//            //        io.emit('error', 'server error');
//            //        io.disconnect();
//            //        return;
//            //    }
//            //    if (!session) {
//            //        console.log('-------------------------2------------------');
//            //        io.emit('error', 'username unauthorized');
//            //        io.disconnect();
//            //        return;
//            //    }
//            //    sess = session;
//            //});
//        }
//    //for (var i = 0; i < clients.length; i++) {
//
//
//    }
//
//
//    //for (var i = 0; i < clients.length; i++) {
//    //    oneKey = keyyy[i];
//    //    clientss = clients[oneKey].request.cookies.sid;
//    //    console.log('clientss ' + i + ' = ' + clientss);
//    //    console.log('oneKey ' + i + '=' + oneKey);
//    //    if (clientss == sid) {
//    //        var sidd = clientss.slice(2, sid.length+2);
//    //        console.log('sidd ' + sidd);
//    //        console.log('clientss ' + clientss);
//    //        console.log(keyyy[i]);
//    //
//    //    }
//    //
//    //
//    //    //chack = clients[i].handshake.headers.cookie;
//    //    //checkSubstring = chack.indexOf(sid);
//    //    //console.log(i + ' + ' + checkSubstring);
//    //    //if (checkSubstring != -1) return;
//    //
//    //
//    //    //loadSession(sid, function(err, session) {
//    //    //    if (err) {
//    //    //        io.emit('error', 'server error');
//    //    //        io.disconnect();
//    //    //        return;
//    //    //    }
//    //    //    if (!session) {
//    //    //        io.emit('error', 'username unauthorized');
//    //    //        io.disconnect();
//    //    //        return;
//    //    //    }
//    //    //    io.handshake.session = session;
//    //    //});
//    //}
//
//    //var sessionStore = require('scripts/sessionStore');
//    //var clients = io.eio.clients[keyyy].request.socket;
//    //var clients = io.sockets.sockets;
//    //var chack;
//    //var checkSubstring;
//    //console.log('clients.length ' + clients.length);
//    //clients.forEach(function(client) {
//    //});
//    //    for (var i = 0; i < clients.length; i++) {
//    //        chack = clients[i].handshake.headers.cookie;
//    //        checkSubstring = chack.indexOf(sid);
//    //        console.log(i + ' + ' + checkSubstring);
//    //        if (checkSubstring != -1) return;
//    //        loadSession(sid, function(err, session) {
//    //            if (err) {
//    //                io.emit('error', 'server error');
//    //                io.disconnect();
//    //                return;
//    //            }
//    //            if (!session) {
//    //                io.emit('error', 'username unauthorized');
//    //                io.disconnect();
//    //                return;
//    //            }
//    //            io.handshake.session = session;
//    //        });
//    //    }
//
//    //clients.forEach(function(client) {
//    //    clients.handshake.headers.cookie;
//    //    var checkSubstring = clients.indexOf(sid);
//    //    console.log(checkSubstring);
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
//
//
//
//    //var clients = io.eio.clients[keyyy].transport.socket;
//    //console.log(io.eio.clients.length);
//    //console.log('--------------sid------------------------------------   ' + sid);
//    //console.log(clients);
//    //console.log('key------- ' + keyyy);
//    //var test = req.app.get('test');
//    //console.log('--------------test------------------------------------   ' + test);
//    //req.session.destroy(function(err) {
//    //    //io.emit('session:reload', 'for test');
//    //    if (err) return next(err);
//    //    res.redirect('/');
//    //});
//    req.session.destroy();
//    res.redirect('/');
//});


module.exports = router;