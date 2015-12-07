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

router.get('/login-chat', require('./login-chat').get);
router.post('/login-chat', require('./login-chat').post);
router.get('/chat', require('./chat').get);



//Chat_________________________________________________________________________________________________________________



var User = require('scripts/usersChat').User;
var HttpError = require('scripts/errorHandler').HttpError;

router.use('/users', function(req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    })
});
router.use('/user/:id', function(req, res, next){
    User.findById(req.params.id, function(err, user){
        //При надобності, організувати правильну обробку ошибок
        if (err) return next(err);
        if (!user) {
            console.error('User not found');
            throw new Error('User not found');
            //next(new HttpError(404, 'User not found.'));
        }
        res.json(user);
    })
});






router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

module.exports = router;