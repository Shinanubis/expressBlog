var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

// Database Name
const dbName = 'expressBlog';


// Use connect method to connect to the server
MongoClient.connect(url, options, function(err, client) {
  assert.equal(null, err);
  const db = client.db(dbName);
  if(err){console.log("Failed to connect to the database");}
  console.log("Connected successfully to database");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var russianRouletteRouter = require('./routes/russianRoulette')
var withoutJsRouter = require('./routes/withoutJs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//alias assets
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));
app.use('/img', express.static('./public/img'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/withoutJs', withoutJsRouter);
app.use('/russianRoulette', russianRouletteRouter);

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
