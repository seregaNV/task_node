var User = require('scripts/usersChat').User;
//var HttpError = require('scripts/errorHandler').HttpError;
//var AuthError = require('scripts/userChat').AuthError;


exports.get = function(req, res, next) {
    res.render('login-chat', {
        title: 'Authorization',
        jumbotitle: 'Authorization',
        jumbotext: 'Implementation of a chat with support sessions, the authorization and templating'
    });
};

exports.post = function(req, res, next) {
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
};