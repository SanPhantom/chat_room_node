var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressWs = require('express-ws');
var bodyParser = require('body-parser');
// var multiparty = require('connect-multiparty');
var multer = require('multer'); // v1.0.5
// var upload = multer(); // for parsing multipart/form-data
var TokenJWT = require('./utils/token')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
expressWs(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// var bodyJson = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser());

//api接口token检验
app.use(function(req, res, next) {
    if (req.url !== '/login' && req.url !== '/register') {
        let token = req.header.token;
        let jwt = new TokenJWT(token);
        let result = jwt.verifyToken();

        if (result === 'error') {
            res.send({ code: 400, msg: '登录已过期，请重新登录' });
        } else {
            next();
        }
    } else {
        next();
    }
})

//跨域解决方式
app.use(function(req, res, next) {
    console.log(req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin); //允许的来源
    res.header("Access-Control-Allow-Headers", "Content-Type, Token"); //请求的头部
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许请求的方法
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})


app.use('/', indexRouter);
app.use('/users', usersRouter);

//webSocket 实例
// new WSRouter(app, http.createServer(app));

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