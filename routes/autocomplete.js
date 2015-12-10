var express = require('express'),
    companyData = require('../data/task.json'),
    router = express.Router(),
    companyList,
    chosenCompany;

router.get('/autocomplete', function(req, res, next) {
    if (req.query.query == "") {
        res.render('not-found', {
            title: 'Not found',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies',
            header: 'Null value in input',
            message: 'To select the company, please enter the value of search...'
        });
    } else {
        next();
    }
});

router.get('/autocomplete', function(req, res, next) {
    if (!req.query.query) {
        res.render('autocomplete', {
            title: 'Autocomplete',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies'
        });
    } else {
        next();
    }
});

router.get('/autocomplete', function(req, res, next) {
    var valueOfQuery = req.query.query;

    if (valueOfQuery) {
        var partNameCompany;
        chosenCompany = {};
        companyList = [];
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
    }
    next();
});

router.get('/autocomplete', function(req, res, next) {
    if (companyList[0]) {
        res.render('company-list', {
            title: 'Chosen companies',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies',
            partMessage: 'chosen',
            companyData: companyList
        });
    } else {
        next();
    }
});

router.get('/autocomplete', function(req, res, next) {
    if (chosenCompany.company) {
        res.render('company-info', {
            title: chosenCompany.company,
            jumbotitle: chosenCompany.company,
            jumbotext: chosenCompany.discription,
            companyData: chosenCompany
        });
    } else {
        res.render('not-found', {
            title: 'Not found',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies',
            header: 'Null result',
            message: 'Company by your request is not found...'
        });
    }
});

module.exports = router;