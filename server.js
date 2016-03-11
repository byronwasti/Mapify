var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');
var SpotifyStrategy = require('passport-spotify').Strategy;
var passport = require('passport');
var login = require('./routes/login')(passport)
var index = require('./routes/index')();

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());

const compiler = webpack(config);
app.use(webpackMiddleware(compiler, 
 {
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}
));
app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10*1000
}));

app.use(express.static(path.join(__dirname, '/public')));  

app.use(session({ secret: 'this is not a secret ;)',
  cookie:{},
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Handle login/logout and auth routes
app.get('/verifyLogin', index.verifyLogin);
app.get('/logout', index.logout);
app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/' }), index.spotifyCallback);


app.get('/auth/spotify', 
  passport.authenticate('spotify', {scope: ['user-read-email','user-read-birthdate', 'user-read-private'], showDialog: true}),
  function(req, res){
});

app.get('/api/lookupMusic', index.lookupMusic);
app.get('/api/thirtySecondSample', index.thirtySecondSample)
app.post('/api/setDuration', index.setDuration);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Application running on port:', PORT);
});

module.exports = app;
