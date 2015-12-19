var mongoose = require('scripts/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: String,
    company: String,
    country: String,
    founding_date: String,
    phone: String,
    discription: String
});

exports.Companys = mongoose.model('Companys', schema);