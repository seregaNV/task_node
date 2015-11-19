var express = require('express'),
    router = express.Router(),
    app = express(),
    util = require('util');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Task 17'
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