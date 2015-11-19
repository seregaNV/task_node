var express = require('express'),
    router = express.Router(),
    app = express(),
    util = require('util');

//
//title
//jumbotitle
//jumbotext



router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Tasks'
    });
});

router.get('/news', function(req, res, next) {
    res.render('index', {
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





router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

router.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        res.status(500).render('error', {
            title: 'Error page',
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(404).send('Page not found');
    }
});

module.exports = router;