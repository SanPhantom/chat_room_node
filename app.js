var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressWs = require('express-ws');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
expressWs(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//webSocket 实例
// new WSRouter(app, http.createServer(app));

app.post('/login', upload.array(), function(req, res) {
    console.log(req.body);
    res.send(req.body);
}).get('/login', function(req, res) {
    console.log(req.query);
    res.send(req.query);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;