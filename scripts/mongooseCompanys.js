var mongooseCompanys = require('mongoose'),
    config = require('config');
mongooseCompanys.connect(config.get('mongooseCompanys:uri'), config.get('mongooseCompanys.options'));

module.exports = mongooseCompanys;