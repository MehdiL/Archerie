var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieSession = require('cookie-session');
var Sequelize = require("sequelize");
var index = require('./routes/index');
var users = require('./routes/users');
var hbs = require('hbs');

var app = express();
var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }


});
//vue pariels pour handlebars

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); //
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascripts', express.static(__dirname + '/public/javascripts')); //
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets')); //
app.use('/images', express.static(__dirname + '/public/images')); //
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts')); //

app.use('/', index);
app.use('/users', users);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({keys: ['omgreport']}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


require('./routes/passport.js')(passport);
require('./routes/authenticate.js')(app,passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
