var newrelic = require('newrelic');

var dotenv = require('dotenv');
dotenv.load();

// var redis = require('redis');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var fs = require("fs");
// var config = require('./config/config.json');
var cache = require('express-redis-cache');
var app = express();
// var client = redis.createClient(); //creates a new client
// client.on('connect', function() {
//     console.log('connected');
// });
// In Express, this lets you call newrelic from within a template.
app.locals.newrelic = newrelic;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// path to static assets, normally /public
app.use(express.static(path.join(__dirname, '')));

app.use('/', routes);
app.use('/users', users);
app.use('/', tasks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//var Sequelize = require('sequelize')
//    , sequelize = new Sequelize('node', 'root', 'root', {
//  dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
//  port:    3306, // or 5432 (for postgres)
//});
//
//sequelize
//    .authenticate()
//    .then(function(err) {
//      console.log('Connection has been established successfully.');
//    }, function (err) {
//      console.log('Unable to connect to the database:', err);
//    });
//
//var User = sequelize.define('user', {
//  username: Sequelize.STRING,
//  birthday: Sequelize.DATE
//});
//
//sequelize.sync().then(function() {
//  return User.create({
//    username: 'janedoe',
//    birthday: new Date(1980, 6, 20)
//  });
//}).then(function(jane) {
//  console.log(jane.get({
//    plain: true
//  }));
//});

//var mysql      = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'root',
//  password : 'root',
//  database : 'node'
//});
//
//connection.connect();
//
//connection.query('SELECT * from TEST', function(err, rows, fields) {
//  if (!err)
//    console.log('The solution is: ', rows);
//  else
//    console.log('Error while performing Query.');
//});
//
//connection.end();


module.exports = app;
