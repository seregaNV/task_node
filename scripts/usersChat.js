var crypto = require('crypto');
var mongoose = require('scripts/mongoose');
var async = require('async');
var Schema = mongoose.Schema;
var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


var comp = new Schema({
    _id: String,
    company: String,
    country: String,
    founding_date: String,
    phone: String,
    discription: String
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password)})
    .get(function(){
        return this._plainPassword
    });

schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
    var User = this;
    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    next('Wrong password');
                    //throw new Error('Wrong password');
                    //callback(new AuthError('Wrong password'));
                    console.error('Wrong password');
                }
            } else {
                var user = new User({username: username, password: password});
                user.save(function(err) {
                    if (err) return callback(err);
                    callback(null, user);
                    //... 200 OK
                });
            }
        }
    ], callback);
};

exports.User = mongoose.model('User', schema);
exports.Companys = mongoose.model('Companys', comp);
//
//function AuthError(message) {
//    Error.apply(this, arguments);
//    Error.captureStackTrace(this, AuthError);
//    this.message = message;
//}
//
//util.inherits(AuthError, Error);
//AuthError.prototype.name = 'AuthError';
//exports.AuthError = AuthError;