var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var support = require('@rsterbin/express-api-support');

var apiRouter = require('./routes/api');

require('dotenv').config();

var app = express();

// API support
support.init(['cors', 'react'], {
    system: { apiUrlPrefix: '/api/v1' },
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// express setup
if (support.getContext('system').setting('environment') !== 'production') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
support.middleware(app);

// routes
app.use('/api/v1', apiRouter);

// handlers
support.handlers(app);

module.exports = app;
