var mongoose = require('scripts/mongoose');
var async = require('async');
var companyData = require('../data/task.json');

//mongoose.connection.on('open',
//    function dropDatabase(callback){
//        var db = mongoose.connection.db;
//        db.dropDatabase();
//    });
//mongoose.disconnect();

async.series([
    open,
    dropDatabase,
    createUsers
], function(err, results){
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback){
    var Companys = require('scripts/companysDB').Companys;
    async.each(companyData, function(Data, callback){
        var company = new Companys(Data);
        company.save(callback);
    }, callback);
}