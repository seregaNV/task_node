var express = require('express'),
    router = express.Router();

router.get('/simple-angular', function(req, res, next) {
    res.render('angularJS/simle-angular', {
        title: 'Tasks 24',
        jumbotitle: 'Tasks 24',
        jumbotext: 'Getting started with AngularJS.'
    });
});
router.get('/phone-app', function(req, res, next) {
    res.render('angularJS/phoneAPP', {
        title: 'Tasks',
        jumbotitle: 'Null value in input',
        jumbotext: 'To select the company, please enter the value of search...',
        header: 'Null value in input',
        message: 'To select the company, please enter the value of search...'
    });
});

module.exports = router;