var express = require('express');
var router = express.Router();

router.get('/slider', function(req, res, next) {
    res.render('slider', {
        title: 'Slider',
        jumbotitle: 'Task 10',
        jumbotext: 'Constructor + plugin for the slide'
    });
});

router.get('/hash-map', function(req, res, next) {
    res.render('hashMap', {
        title: 'HashMap',
        jumbotitle: 'Task 9',
        jumbotext: 'Using JavaScript and prototypes write analogue HashMap (Java)'
    });
});
module.exports = router;