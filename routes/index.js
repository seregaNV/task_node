var express = require('express'),
    router = express.Router();


router.get('/*', function(req, res, next) {
    var valueOfQuery = req.query.autocomplete;
    if (valueOfQuery) {
        var companyData = require('../data/task.json'),
            partNameCompany,
            companyList = [],
            chosenCompany = {};
        valueOfQuery = valueOfQuery.charAt(0).toUpperCase() + valueOfQuery.substr(1).toLowerCase();

        for (var i in companyData) {
            partNameCompany = companyData[i].company.slice(0, valueOfQuery.length);

            if ((valueOfQuery == partNameCompany) && (valueOfQuery != companyData[i].company)) {
                companyList.push(companyData[i]);

            } else if (valueOfQuery == companyData[i].company) {
                chosenCompany.company = companyData[i].company;
                chosenCompany.country = companyData[i].country;
                chosenCompany.founding_date = companyData[i].founding_date;
                chosenCompany.phone = companyData[i].phone;
                chosenCompany.discription = companyData[i].discription;
            }
        }
        if (companyList[0]) {
            res.render('company-list', {
                title: 'Chosen companies',
                jumbotitle: 'Chosen companies',
                jumbotext: 'A list of companies that are suitable to your search',
                partMessage: 'chosen',
                companyData: companyList
            });
        } else if (chosenCompany.company) {
            res.render('company-info', {
                title: chosenCompany.company,
                jumbotitle: chosenCompany.company,
                jumbotext: chosenCompany.discription,
                companyData: chosenCompany
            });
        } else {
            res.render('not-found', {
                title: 'Not found',
                jumbotitle: 'Null result',
                jumbotext: 'Company by your request is not found...',
                header: 'Null result',
                message: 'Company by your request is not found...'
            });
        }
    } else if (valueOfQuery == ''){
        res.render('not-found', {
            title: 'Not found',
            jumbotitle: 'Null value in input',
            jumbotext: 'To select the company, please enter the value of search...',
            header: 'Null value in input',
            message: 'To select the company, please enter the value of search...'
        });
    } else {
        next();
    }
});

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
    var pluginAsc = req.query.queryToDB;
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