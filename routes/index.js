var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
    res.render('main', {
        title: 'Tasks'
    });
});

router.get('/news', function(req, res, next) {
    res.render('main', {
        title: 'News'
    });
});

router.get('/blog', function(req, res, next) {
    res.render('blog', {
        title: 'Blog'
    });
});

var Companys = require('scripts/usersChat').Companys;
router.get('/company-db', function(req, res, next) {
    var pluginAsc = req.query.autocomplete;
    var reg = new RegExp(pluginAsc, 'i');
    var conditions = {};
    conditions['company'] = reg;
    Companys.find(conditions, function(err, tester){
        var companys = [];
        for (var i = 0; i < tester.length; i++) {
            companys.push(tester[i].company);
        }
        console.log(companys);
        res.send(companys);
    });
});



//Chat_________________________________________________________________________________________________________________

var User = require('scripts/usersChat').User;
var ObjectID = require('mongodb').ObjectID;
//var HttpError = require('scripts/errorHandler').HttpError;

router.get('/users', function(req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    })
});

router.get('/user/:id', function(req, res, next){
    try {
        var id = new ObjectID(req.params.id);
    } catch (e) {
        next(404);
        return;
    }
    User.findById(req.params.id, function(err, user){
        //При надобності, організувати правильну обробку ошибок
        if (err) return next(err);
        if (!user) {
            //console.error('User not found');
            //throw new Error('User not found');
            //next(new HttpError(404, 'User not found.'));
        }
        res.json(user);
    })
});

module.exports = router;