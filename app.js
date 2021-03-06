var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HttpError = require('./scripts/errorHandler').HttpError;

var routes = require('./routes/index');
//var angularJS = require('./routes/angularJS');
var simpleChat = require('./routes/simple-chat');
var dataJson = require('./routes/data-json');
var testMyAutocomplete = require('./routes/test-my-autocomplete');
var youtube = require('./routes/youtube');
var simpleTasks = require('./routes/simple-tasks');
var chat = require('./routes/chat');

var app = express();

var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));

swig.setDefaults({cache: false});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('middleware/sendHttpError'));
//app.use(require('middleware/loadUser'));

var expressSession = require('express-session');
var sessionStore = require('scripts/sessionStore');

app.use(expressSession({
    secret: "KillerIsJim",
    key: "sid",
    cookie: {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));

//app.use(function(req, res, next) {
//    req.session.numberOfVisits = req.session.numberOfVisits +1 || 1;
//    res.send('Visits: ' + req.session.numberOfVisits);
//});


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
//app.use(angularJS);
app.use(simpleChat);
app.use(dataJson);
app.use(testMyAutocomplete);
app.use(youtube);
app.use(simpleTasks);
app.use(chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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


 //development error handler
 //will print stacktrace
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


//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        if (typeof err == 'number') {
//            err = new HttpError(err);
//        }
//        if (err instanceof HttpError) {
//            res.sendHttpError(err);
//        } else {
//            res.status(err.status || 500);
//            res.render('error', {
//                title: Error,
//                message: err.message,
//                error: err,
//                stack: err.stack
//            });
//            console.log(err);
//        }
//    })
//}


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
