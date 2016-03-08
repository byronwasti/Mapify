var rp = require('request-promise');
var auth = require('../auth');

module.exports = function(){
	return {
		verifyLogin: function(req, res){
			res.json({user: req.user});
		},

		spotifyCallback: function(req, res){
		  	console.log("CALLBACK: " + req.user.displayName);
		    res.redirect('/');
		},

		logout: function(req, res){
			req.logout();
			res.redirect('/')
		},

        echonest: function(req,res){
            rp({
                method: 'GET',
                uri: 'http://developer.echonest.com/api/v4/song/search',
                qs: {
                    api_key: auth.ECHONEST_API_KEY,
                    format: 'json',
                    artist: 'radiohead'
                },
                json: true
            })
            .then(function(songs){
                res.json(songs);
            });
        },

        spotify: function(req, res){
            rp({
                method: 'GET',
                uri: 'https://api.spotify.com/v1/search',
                qs: {
                    q: 'radiohead',
                    type: 'artist'
                },
                json: true
            })
            .then(function(songs){
                res.json(songs);
            });
        },

        spotify2: function(req, res){
            console.log(req.session.passport.user.accessToken);
            rp({
                method: 'GET',
                uri: 'https://api.spotify.com/v1/me',
                qs: {
                },
                headers: {
                    Authorization: req.session.passport.user.accessToken
                },
                json: true
            })
            .then(function(profile){
                res.json(profile);
            })
            .catch(function(err){
                res.json(err);
            });
        }
	}
}
