exports.get = function(req, res, next) {
    var util = require('util'),
        companyData = require('../data/task.json'),
        choiceId = util.format(req.params.id),
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
};