var express = require('express'),
    router = express.Router();

router.get('/', require('./main').get);
router.get('/news', require('./news').get);
router.get('/blog', require('./blog').get);
router.get('/hash-map', require('./hash-map').get);
router.get('/slider', require('./slider').get);
router.get('/youtube', require('./youtube').get);

router.get('/data-json', require('./data-json').get);
router.get('/company', require('./dj-company').get);
router.get('/company/:id', require('./dj-companyID').get);

router.get('/autocomplete', require('./autocomplete').get);

router.get('/simple-chat', require('./simple-chat').get);
router.use('/subscribe', require('./sc-subscribe').set);
router.use('/publish',  require('./sc-publish').set);




//Chat_________________________________________________________________________________________________________________


var config = require('config');
var expressSession = require('express-session');
var mongoose = require('scripts/mongoose');
var MongoStore = require('connect-mongo')(expressSession);

router.use('/login-chat', function(req, res, next) {
    res.render('login-chat', {
        title: 'Slider',
        jumbotitle: 'Chat',
        jumbotext: 'Implementation of a chat with support sessions, the authorization and templating'
    });
});



var User = require('scripts/usersChat').User;


router.use('/users', function(req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    })
});
router.use('/user/:id', function(req, res, next){
    User.findById(req.params.id, function(err, user){
        //При надобності, організувати правильну обробку ошибок
        //if (err) return next(err);
        //if (!user) {
        //    console.error('User not found');
        //    throw new Error('User not found');
        //    //next(new HttpError(404, 'User not found.'));
        //}
        res.json(user);
    })
});




router.use(expressSession({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true
}));

router.use(function(req, res, next) {
    req.session.numberOfVisits = req.session.numberOfVisits +1 || 1;
    res.send('Visits: ' + req.session.numberOfVisits);
});




router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

module.exports = router;