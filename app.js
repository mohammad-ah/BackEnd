/**
 * Module dependencies.
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");

/**
 * Routing Module Dependencies.
 */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const postsRouter = require('./routes/posts');


/**
 * Express Module.
 */
const app = express();


/**
 * view engine setup
 */
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');


/**
 * Express Dep usage
 */
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routing
 */
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/post', postsRouter);


/**
 * error handling
 */
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
  // res.render('error');
});


/**
 * Export Express App
 */
module.exports = app;
