var SpotifyStrategy = require('passport-spotify').Strategy;

module.exports = function(passport){

	var clientID = process.env.SPOTIFY_CLIENT_ID || require('../auth').SPOTIFY_CLIENT_ID;
	var clientSecret = process.env.SPOTIFY_CLIENT_SECRET || require('../auth').SPOTIFY_CLIENT_SECRET;
	var callbackURL = process.env.SPOTIFY_CALLBACK_URL || require('../auth').SPOTIFY_CALLBACK_URL;

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
        profile.accessToken = accessToken;
  		done(null, profile);
  	}));
}
