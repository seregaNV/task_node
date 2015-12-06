/*саме цей файл всі будуть підключати для роботи з мангустом,
* він буде создавати мангус*/

/*база данних для класів*/
/*підключяємо мангуст*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
//var config = require('config');
/*конектимо, і добавляємо наступну строчку в "config/config.json"*/
//mongoose.connect('mongodb://localhost/chat');

/*настраюємо конект з використанням "config.json"*/
//mongoose.connect(config.get('mongoose:uri'), config.get('mongoose.options'));

module.exports = mongoose;