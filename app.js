const createError = require('http-errors');
const express = require('express');
const favicon = require("serve-favicon");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const api = require('./routes/api/index');
const users = require('./routes/api/users');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session')({
                        secret: 'any random string can go here',
                        resave: false,
                        saveUninitialized: false
                      });
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const User = require('./models/user');
const authentication = require('./routes/api/authentication');

const app = express();

// Connect Mongoose
mongoose.connect('mongodb://localhost/musiclist');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Webpack Server
/* 
if (process.env.NODE_ENV !== 'production') {
const webpackCompiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: true,
    'errors-only': true,
  },
}));
app.use(webpackHotMiddleware(webpackCompiler, {
  log: console.log,
})); 
}
*/

app.use('/users', usersRouter);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/authentication', authentication);
app.use('/*', indexRouter);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
