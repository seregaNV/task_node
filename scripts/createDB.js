var mongoose = require('scripts/mongoose');
/*для того, щоб бачити, що робить мангус*/
//mongoose.set('debug', true);
/*підключаємо бібліотеку для виконання цепочки асинхронних визовів*/
var async = require('async');
/*розкидаємо наступне підключення по коду, так-як нам необхідно
* його підключати саме в потрібних місцях*/
//var User = require('models/user').User;
/*данний модуль буде створювати тестову базу. Основні задачі:
* - вбивати існуючю базу,
* - створювати трьох юзерів, сохраняти їх,
* - і коли вони будуть готові, закривати з"єднання*/

/*для того, щоб запустити наступні функції одну за другою,
* скористуємося наступним методом, який получяє масив з функцій,
* викликає їх одну за іншою (запускає 1-шу ф-ю, чикає пока визвиться
* її колбек ...), і після визова всіх функцій, визивається ф-я
* з результатами виконання*/
async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err, results){
    console.log(arguments);
    mongoose.disconnect();
    /*вказуємо код виходу для того, щоб внєшні системні скріпти
    * визвавши цей моглиб поняти, чи він нопм закінчився*/
    process.exit(err ? 255 : 0);
});

/*наступні чотири функції виконуються послідовно одна за іньшою,
* це реалізовано за допомогою використання функцій "callback"*/
/*перша функція - відкритя базию Параметром приймає тільки колбек.
* Вся задачя данної функції - це підождати, пока мангус скаже,
* що з"єднання готове для використання*/
function open(callback){
    mongoose.connection.on('open', callback);
}

/*наступна функція нічього не получяє, оскільки ДБ у нас уже є*/
function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}
/*для того, щоб зачекати з вставкою нових юзерів, поки індекси не будуть
* повністью создани, для цього ми создамо окрему функцію, в яку винесемо
* операцію підключення нових модкїелей*/
function requireModels(callback){
    require('scripts/user');
    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
/*наступна функція паралельно создає юзерів, після чього не закриває
* з"єднання, а визиває колбек*/
function createUsers(callback){
    /*для удобства об"єднаємо усіх юзерів в масив*/
    var users = [
        {username: 'admin', password: '123'},
        {username: 'Петя', password: '456'},
        {username: 'Вася', password: '789'}
    ];
    console.log(users);
    console.log(arguments);
    /*для роботи з данним масивом ми використовуємо наступну ф-ю.
    * Вона призначена для паралельної, асинхронної роботи з масивом*/
    async.each(users, function(userData, callback){
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);

    //async.parallel([
    //    function(callback){
    //        var admin = new User({username: 'admin', password: '123'});
    //        admin.save(function(err){
    //            callback(err, admin);
    //        })
    //    },
    //    function(callback){
    //        var petya = new User({username: 'Петя', password: '456'});
    //        petya.save(function(err){
    //            callback(err, petya);
    //        })
    //    },
    //    function(callback){
    //        var vasya = new User({username: 'Вася', password: '789'});
    //        vasya.save(function(err){
    //            callback(err, vasya);
    //        })
    //    }
    //], callback);

}
//function close(callback){
//    mongoose.disconnect(callback);
//}

//
///*в "mongoose" немає команди, якоюб можна булоб удалити стару базу данних,
// * тому для цього ми використаємо об"єкт БД, який згенероватин
// * "mongodb-native", який використовує "mongoose" внутрі*/
//
///*В нас получилася доволі велика функція, яку для удобства необхідно
//* розбити на меньші*/
//mongoose.connection.on('open', function(){
//    var db = mongoose.connection.db;
//    /*перевіримо, чи підключені ми до бази, чи ні*/
//    console.log(mongoose.connection.readyState);
//    db.dropDatabase(function(err){
//        if (err) throw err;
//        console.log('OK');
//
//        /*создамо і паралельно сохраняємо трьох юзерів, після чього продовжуємо
//        * поток виконання (закрити з"єднання).
//        * Для цього в "" вписуємо три функції задачі, які приймають колбек
//        * і коли всі функції-задачі закінчуться,то остання функція отримає їх результати,
//        * виведе їх в лог і закриє з"єднання*/
//        async.parallel([
//            function(callback){
//                var admin = new User({username: 'admin', password: '123'});
//                admin.save(function(err){
//                    callback(err, admin);
//                })
//            },
//            function(callback){
//                var petya = new User({username: 'Петя', password: '456'});
//                petya.save(function(err){
//                    callback(err, petya);
//                })
//            },
//            function(callback){
//                var vasya = new User({username: 'Вася', password: '789'});
//                vasya.save(function(err){
//                    callback(err, vasya);
//                })
//            }
//        ], function(err, results){
//            console.log(arguments);
//            mongoose.disconnect();
//        });
//    });
//});
//
