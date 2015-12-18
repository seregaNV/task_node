var mongooseCompanys = require('scripts/mongooseCompanys');
var Schema = mongooseCompanys.Schema;

var schema = new Schema({
    _id: String,
    company: String,
    country: String,
    founding_date: String,
    phone: String,
    discription: String
});

exports.Companys = mongooseCompanys.model('Companys', schema);