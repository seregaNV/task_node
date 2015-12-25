var HttpError = require('scripts/errorHandler').HttpError;
module.exports = function(req, res, next) {
    //console.log(req.session);
    if (!req.session.user) {
        //console.error('You are not authorized');
        //throw new Error('You are not authorized');
        res.redirect('/login-chat');
        return false;// ?
    }
    next();
};