/*в данній БД ми не чикаємо підключення до неї.
* Мангус наступні команди запоминає, і при наступному підключенню
* їх виконає, навіть якщо з"єднання перерветься, то мангос при
* наступному підключенню виконає оставшиєся команди*/
/*команди бази данних*/
/*об"являємо класс з ім"ям "Cat" і строчкою "name: String".
* Тепер, коли ми создаємо новий об"єкт "var kitty = new Cat",
* і добавляємо ще якіто строки, то вони не будуть відображатися*/
/*для того, щоб добавити об"єк з повноцінними методами,
* розбиваємо "{ name: String }" на дві чястини*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//var config = require('config');
//mongoose.connect(config.get('mongoose:uri'), config.get('mongoose.options'));

var schema = mongoose.Schema({
    name: String
});
schema.methods.meow = function(){
    console.log(this.get('name'));
};
var Cat = mongoose.model('Cat', schema);
//var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({
    name: 'Zildjian'
});

console.log(kitty);
/*сохранимо "kitty" в базу данних в колекцію з назвою "cats".
* "err" - ошибки, "kitty" - сам об"єкт, "affected" - кількість змінених
* записів*/
kitty.save(function (err, kitty, affected) {
    kitty.meow();
    console.log(arguments);
});