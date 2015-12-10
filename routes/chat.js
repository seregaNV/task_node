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
        if (err) return next(err);
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

router.post('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;