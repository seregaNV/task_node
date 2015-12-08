var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// swig cache off
swig.setDefaults({cache: false});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




var config = require('config');
var expressSession = require('express-session');
var mongoose = require('scripts/mongoose');
var MongoStore = require('connect-mongo')(expressSession);
app.use(expressSession({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true
}));

//app.use(function(req, res, next) {
//    req.session.numberOfVisits = req.session.numberOfVisits +1 || 1;
//    res.send('Visits: ' + req.session.numberOfVisits);
//});

//app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
//app.use('/users', users);


//var errorhandler = require('errorhandler');
//var HttpError = require('scripts/errorHandler').HttpError;
//app.use(function(err, req, res, next) {
//    if (typeof err == 'number') {
//        err = new HttpError(err);
//    }
//    if (err instanceof HttpError) {
//        res.sendHttpError(err);
//    } else {
//        if (app.get('env') == 'development') {
//            app.use(errorhandler());
//        } else {
//            console.error(err);
//            err = new HttpError(500);
//            res.sendHttpError(err);
//        }
//    }
//});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: Error,
            message: err.message,
            error: err,
            stack: err.stack
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: Error,
        message: err.message,
        error: {}
    });
});


module.exports = app;
