exports.get = function(req, res, next) {
    var companyData = require('../data/task.json'),
        count = req.query.count,
        countData = companyData.slice(0, count),
        partMessage;
    //    page = req.query.page;
    //console.log(count);
    //console.log(page);
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
};