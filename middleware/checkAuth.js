var HttpError = require('scripts/errorHandler').HttpError;
module.exports = function(req, res, next) {
    if (!req.session.user) {
        console.error('You are not authorized');
        //return false;
        throw new Error('You are not authorized');
    }
    next();
};