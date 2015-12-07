exports.set = function(req, res, next) {
    var chat = require('../scripts/sc_chat');
    chat.subscribe(req, res);
};