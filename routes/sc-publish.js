exports.set = function(req, res, next) {
    var chat = require('../scripts/sc_chat'),
        body = '';
    /*вішаємо на "req" необхідні обработчики*/
    req.on('readable', function() {
        /*при отриманні чергового пакета данних ми прибавляємо
         * його до тимчасової пєрємєнної*/
        body += req.read();
        /*перевірка велечини повідомлення*/
        if (body.length > 1e4) {
            console.error('Your message is too big for correctly work!');
            throw new Error('Your message is too big for correctly work!');
        }
    }).on('end', function() {
        /*коли данні повністю отримані, розбираємо їх як "JSON"*/
        try {
            body = JSON.parse(body);
        } catch (e) {
            /*перевірка на валідність "JSON"*/
            console.error('Bad Request!');
            throw new Error('Bad Request!');
        }
        /*публікуємо отримані і перебрані данні в "body.message".
         * Ця команда розішле повідомлення всім, хто підписався
         * в "subscribe"*/
        chat.publish(body.message);
        /*закриваємо тєкущий запрос, через який був відправлений пост*/
        res.end("ok");
    });
};