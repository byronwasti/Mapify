var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = './webpack.config.js'
var SpotifyStrategy = require('passport-spotify').Strategy;
var passport = require('passport');
var login = require('./login')(passport)
var index = require('./routes/index')();


var index = require('./routes/index')();

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));  

app.use(session({ secret: 'this is not a secret ;)',
  cookie:{},
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', index.GETlogin);

app.get('/auth/spotify', 
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res){
  	// res.json({user: req.user});
});

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
  	console.log("CALLBACK: " + req.user.displayName);
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Application running on port:', PORT);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = app;
