var SpotifyStrategy = require('passport-spotify').Strategy;
var auth = require('../auth');

module.exports = function(passport){

	var clientID = process.env.clientID || auth.SPOTIFY_CLIENT_ID;
	var clientSecret = process.env.clientSecret || auth.SPOTIFY_CLIENT_SECRET;
	var callbackURL = process.env.callbackURL || auth.SPOTIFY_CALLBACK_URL;

 	passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(new SpotifyStrategy({
	    clientID: clientID,
	    clientSecret: clientSecret,
	    callbackURL: callbackURL
  	},

  	function(accessToken, refreshToken, profile, done){
  		console.log("LOGGING IN");
  		done(null, profile);
  	}));
}