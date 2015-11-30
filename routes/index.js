var express = require('express'),
    router = express.Router(),
    chat = require('../scripts/sc_chat'),
    util = require('util');

//
//title
//jumbotitle
//jumbotext



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

router.get('/hash-map', function(req, res, next) {
    res.render('hashMap', {
        title: 'HashMap',
        jumbotitle: 'Task 9',
        jumbotext: 'Using JavaScript and prototypes write analogue HashMap (Java)'
    });
});

router.get('/slider', function(req, res, next) {
    res.render('slider', {
        title: 'Slider',
        jumbotitle: 'Task 10',
        jumbotext: 'Constructor + plugin for the slide'
    });
});

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
            res.statusCode = 413;
            res.end("Your message is too big for correctly work!");
        }
    }).on('end', function() {
        /*коли данні повністю отримані, розбираємо їх як "JSON"*/
        try {
            body = JSON.parse(body);
        } catch (e) {
            /*перевірка на валідність "JSON"*/
            res.statusCode = 400;
            res.end("Bad Request!");
            return;
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