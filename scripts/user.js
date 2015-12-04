/*в данному файлі будуть хранитися моделі - це об"єкти
* для збереження данних*/

var crypto = require('crypto');
var mongoose = require('scripts/mongoose');
var Schema = mongoose.Schema;

/*схема, яка об"являє наступні об"єкти*/
var schema = new Schema({
    username: {
        type: String,
        /*"unique", тобто "username" буде унікальним, тобто в базі може
        * зберігатися тільки один юзер з таким ім"ям*/
        unique: true,
        /*"required", тобто обов"язкове для заповнення поле*/
        required: true
    },
    /*наступні об"єкти для захисту пароля*/
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

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

/*віртуальний пароль створюється для більшого захисту інформації.
* саме значення 'password' не буде зберігатися в базі данних,
* а зберігатимуться спеціальні ключі, які генеруються з використанням пароля*/
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

exports.User = mongoose.model('User', schema);