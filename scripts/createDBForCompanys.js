var mongooseCompanys = require('scripts/mongooseCompanys');
var async = require('async');
var companyData = require('../data/task.json');

//mongooseCompanys.connection.on('open',
//    function dropDatabase(callback){
//        var db = mongooseCompanys.connection.db;
//        db.dropDatabase();
//    });
//mongooseCompanys.disconnect();

async.series([
    open,
    dropDatabase,
    createUsers
], function(err, results){
    mongooseCompanys.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback){
    mongooseCompanys.connection.on('open', callback);
}

function dropDatabase(callback){
    var db = mongooseCompanys.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback){
    var Companys = require('scripts/companysDB').Companys;
    async.each(companyData, function(Data, callback){
        var company = new Companys(Data);
        company.save(callback);
    }, callback);
}