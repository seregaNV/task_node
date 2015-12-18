var mongoose = require('scripts/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
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

function requireModels(callback){
    require('scripts/usersChat');
    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback){
    var users = [
        {username: 'admin', password: '123'}
    ];
    async.each(users, function(userData, callback){
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

