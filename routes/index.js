var express = require('express'),
    router = express.Router(),
    chat = require('../scripts/sc_chat'),
    chosenCompany;


router.get('/', require('./main').get);
router.get('/news', require('./news').get);
router.get('/blog', require('./blog').get);
router.get('/hash-map', require('./hash-map').get);
router.get('/slider', require('./slider').get);
router.get('/youtube', require('./youtube').get);
router.get('/data-json', require('./data-json').get);
router.get('/company', require('./company').get);
router.get('/company/:id', require('./companyID').get);
router.get('/autocomplete', require('./autocomplete').get);




//Chat_________________________________________________________________________________________________________________


var User = require('scripts/user').User;


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






//Simple chat__________________________________________________________________________________________________________
router.get('/simple-chat', function(req, res, next) {
    res.render('simple-chat', {
        title: 'Simple chat',
        jumbotitle: 'Simple chat',
        jumbotext: 'A simple embodiment of the chat.'
    });
});

router.use('/subscribe', function(req, res, next) {
    chat.subscribe(req, res);
});

router.use('/publish', function(req, res, next) {
    var body = '';
    /*вішаємо на "req" необхідні обработчики*/
    req.on('readable', function() {
        /*при отриманні чергового пакета данних ми прибавляємо
         * його до тимчасової пєрємєнної*/
        body += req.read();
        /*перевірка велечини повідомлення*/
        if (body.length > 1e4) {
            console.error('Your message is too big for correctly work!');
            throw new Error('Your message is too big for correctly work!');
        }
    }).on('end', function() {
        /*коли данні повністю отримані, розбираємо їх як "JSON"*/
        try {
            body = JSON.parse(body);
        } catch (e) {
            /*перевірка на валідність "JSON"*/
            console.error('Bad Request!');
            throw new Error('Bad Request!');
        }
        /*публікуємо отримані і перебрані данні в "body.message".
         * Ця команда розішле повідомлення всім, хто підписався
         * в "subscribe"*/
        chat.publish(body.message);
        /*закриваємо тєкущий запрос, через який був відправлений пост*/
        res.end("ok");
    });
});

router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

module.exports = router;