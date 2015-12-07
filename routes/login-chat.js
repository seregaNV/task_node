var User = require('scripts/usersChat').User;

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
        req.session.user = user._id;
        res.send({});
    });
    //async.waterfall([
    //    function(callback) {
    //        User.findOne({username: username}, callback);
    //    },
    //    function(user, callback) {
    //        if (user) {
    //            if (user.checkPassword(password)) {
    //                callback(null, user);
    //            } else {
    //                //next('Wron password');
    //                throw new Error('Wron password');
    //            }
    //        } else {
    //            var user = new User({username: username, password: password});
    //            user.save(function(err) {
    //                if (err) return next(err);
    //                callback(null, user);
    //                //... 200 OK
    //            });
    //        }
    //    }
    //], function(err, user) {
    //    //console.log(session.user);
    //    if (err) return next(err);
    //    req.session.user = user._id;
    //    res.send({});
    //});
};