exports.get = function(req, res, next) {
    var companyData = require('../data/task.json'),
        valueOfQuery = req.query.query;

    if (valueOfQuery == "") {
        res.render('not-found', {
            title: 'Not found',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies',
            header: 'Null value in input',
            message: 'To select the company, please enter the value of search...'
        });

    } else if (!valueOfQuery) {
        res.render('autocomplete', {
            title: 'Autocomplete',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies'
        });

    } else if (valueOfQuery) {
        var checkingExistenceOfCompany,
        //checkSubstring,
            partNameCompany,
            companyList = [],
            chosenCompany = {};
        valueOfQuery = valueOfQuery.charAt(0).toUpperCase() + valueOfQuery.substr(1).toLowerCase();

        for (var i in companyData) {
            //checkSubstring = companyData[i].company.indexOf(valueOfQuery);
            partNameCompany = companyData[i].company.slice(0, valueOfQuery.length);

            if ((valueOfQuery == partNameCompany) && (valueOfQuery != companyData[i].company)) {
                companyList.push(companyData[i]);

            } else if (valueOfQuery == companyData[i].company) {
                chosenCompany.company = companyData[i].company;
                chosenCompany.country = companyData[i].country;
                chosenCompany.founding_date = companyData[i].founding_date;
                chosenCompany.phone = companyData[i].phone;
                chosenCompany.discription = companyData[i].discription;
                checkingExistenceOfCompany = 1;
            }
        }
        if (companyList[0]) {
            res.render('company-list', {
                title: 'Chosen companies',
                jumbotitle: 'Task 18',
                jumbotext: 'Implementation of autocomplete to search for companies',
                partMessage: 'chosen',
                companyData: companyList
            });
        } else if (checkingExistenceOfCompany) {
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
        //if (checkSubstring == 0) {
        //    //console.log('"' + checkSubstring + '"');
        //} else if (checkSubstring == -1) {
        //    //console.log(checkSubstring);
        //}
    } else {
        console.error('Incorrect value of "query"');
        throw new Error('Incorrect value of "query"');
    }
};