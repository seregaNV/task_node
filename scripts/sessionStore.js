var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongoose = require('scripts/mongoose');

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;