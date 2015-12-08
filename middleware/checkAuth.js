var HttpError = require('scripts/errorHandler').HttpError;
 module.exports = function(req, res, next) {
     if (!req.session.user) {
         console.error('You are not authorized');
         return false;
         //return next(new HttpError(401, 'You are not authorized'));
     }
     next();
 };