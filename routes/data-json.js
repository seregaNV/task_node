var express = require('express'),
    util = require('util'),
    router = express.Router(),
    companyData = require('../data/task.json'),
    companyList,
    chosenCompany;

router.get('/company', function(req, res, next) {
    var count = req.query.count,
        countData = companyData.slice(0, count),
        partMessage;
    partMessage = count ? ('first ' + count) : "all";
    if ((!count || ((count == parseInt(Math.abs(count))) && count <= companyData.length)) && count != 0) {
        res.render('company-list', {
            title: 'Company list',
            jumbotitle: 'Task 17',
            jumbotext: 'Working with JSON-files and templating "Swig"',
            partMessage: partMessage,
            companyData: countData
        });
    } else {
        console.error('Incorrect value of "count"');
        throw new Error('Incorrect value of "count"');
    }
});

router.get('/company/:id', function(req, res, next) {
    var choiceId = util.format(req.params.id),
        chosenCompany = {};
    for (var i in companyData) {
        //companyData[i]._id.indexOf(choiceId)
        if (choiceId == companyData[i]._id) {
            chosenCompany.company = companyData[i].company;
            chosenCompany.country = companyData[i].country;
            chosenCompany.founding_date = companyData[i].founding_date;
            chosenCompany.phone = companyData[i].phone;
            chosenCompany.discription = companyData[i].discription;
            res.render('company-info', {
                title: chosenCompany.company,
                jumbotitle: chosenCompany.company,
                jumbotext: chosenCompany.discription,
                companyData: chosenCompany
            });
        }
    }
    if (!chosenCompany.company) {
        console.error('Wrong ID');
        throw new Error('Wrong ID');
    }
});

router.get('/data-json', function(req, res, next) {
    var valueOfQuery = req.query.autocomplete;
    if (valueOfQuery == ''){
        res.render('not-found', {
            title: 'Not found',
            jumbotitle: 'Task 17',
            jumbotext: 'Working with JSON-files and templating "Swig"',
            header: 'Null value in input',
            message: 'To select the company, please enter the value of search...'
        });
    } else if (!valueOfQuery) {
        res.render('data-json', {
            title: 'Data json',
            jumbotitle: 'Task 17',
            jumbotext: 'Working with JSON-files and templating "Swig"'
        });
    } else if (valueOfQuery) {
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
        next();
    } else {
        console.error('Wrong ID');
        throw new Error('Wrong ID');
    }
});

router.get('/data-json', function(req, res, next) {
    if (companyList[0]) {
        res.render('company-list', {
            title: 'Chosen companies',
            jumbotitle: 'Task 17',
            jumbotext: 'Working with JSON-files and templating "Swig"',
            partMessage: 'chosen',
            companyData: companyList
        });
    } else {
        next();
    }
});

router.get('/data-json', function(req, res, next) {
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
            jumbotitle: 'Task 17',
            jumbotext: 'Working with JSON-files and templating "Swig"',
            header: 'Null result',
            message: 'Company by your request is not found...'
        });
    }
});

module.exports = router;