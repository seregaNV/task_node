/*зберігає поточне підключення в масиві*/
var clients = [];

/*при команді "subscribe" добавляється новій об"єкт "res" в масив*/
exports.subscribe = function(req, res) {
    console.log("subscribe");

    //res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    clients.push(res);

    /*закриваємо непотрібні з"єднання, наприклад коли клієнт закрив вікно браузера*/
    res.on('close', function() {
        clients.splice(clients.indexOf(res), 1);
    });
};
/*метод "publish" відправляє повідомлення всім, хто на нього підписався*/
exports.publish = function(message) {
    console.log("publish '%s'", message);

    /*пробігаємся циклом по масиві і всім відправляємо повідомлення,
     * після чього закриваємо з"єднання*/
    clients.forEach(function(res) {
        console.log("send to client");
        res.end(message);
    });

    clients = [];
};

setInterval(function() {
    console.log(clients.length);
}, 5000);