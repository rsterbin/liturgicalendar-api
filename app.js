require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const support = require('@rsterbin/express-api-support');

const apiRouter = require('./routes/api');
const configSpec = require('./config.json');

const app = express();

// API support
support.init(['cors', 'react'], {
  system: { apiUrlPrefix: '/api/v1' },
  lc: { sqs: {} }
}, configSpec);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('support', support);

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
