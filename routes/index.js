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



//




//
//
//
//
//
//
//router.get('/login-chat', require('./login-chat').get);
//router.post('/login-chat', require('./login-chat').post);
//router.get('/chat', checkAuth, require('./chat').get);
//router.post('/logout', require('./logout').post);
//
//router.get('/hash-map', require('./hash-map').get);
//router.get('/slider', require('./slider').get);
//
//router.get('/news', require('./news').get);
//router.get('/blog', require('./blog').get);
//
//router.get('/', require('./main').get);
//
//router.get('/youtube', require('./youtube').get);
//
//router.get('/autocomplete', require('./autocomplete').get);
//
//router.get('/simple-chat', require('./simple-chat').get);
//router.use('/subscribe', require('./sc-subscribe').set);
//router.use('/publish',  require('./sc-publish').set);
//
//router.get('/data-json', require('./data-json').get);
//router.get('/company', require('./dj-company').get);
//router.get('/company/:id', require('./dj-companyID').get);
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
//
//router.use(function(req, res) {
//    console.error('Page not found');
//    throw new Error('Page not found');
//});

module.exports = router;