var User = require('scripts/user').User;
/*создаємо користувачя з парольом*/
var user = new User({
    username: "Tester",
    password: "pass"
});
/*зберігаємо користувачя*/
user.save(function(err, user, affected){
    //console.log(arguments);
    if (err) throw err;
    /*шукаємо користувачя*/
    User.findOne({username: "Tester"}, function(err, tester){
        console.log(tester);
    })
});