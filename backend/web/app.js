const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const index = require('./routes/index.js');
const notice = require('./routes/notice.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');
const register = require('./routes/register.js');
const api = require('./routes/api.js');
const test = require('./routes/test.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    key: 'sid',
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/', index);
app.use('/notice', notice);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/api', api);
app.use('/test', test);

app.use(function (req, res, next) {
  console.log(` next(createError(404));`);
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(`res.render('error');`);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
