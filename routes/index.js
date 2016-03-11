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

        sendDuration: function(req, res){
            
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
                    Authorization: 'Bearer ' + req.session.passport.user.accessToken
                },
                json: true
            })
            .then(function(profile){
                res.json(profile);
            })
            .catch(function(err){
                res.json(err);
            });
        },

        lookupMusic: function(req, res){
            rp({
                method: 'GET',
                uri: 'https://api.spotify.com/v1/search',
                qs: {
                    q: req.query.input,
                    type: req.query.type
                },
                json: true
            })
            .then(function(songs){
                artist_id = songs.artists.items[0].id;
                return rp({
                    method: 'GET',
                    uri: 'https://api.spotify.com/v1/artists/'+artist_id+'/related-artists',
                    json: true
                })
            })
            .then(function(songs){
                res.json(songs);
            })
            .catch(function(err){
                console.log(err);
                console.error("THERE WAS A FUCKING ERROR!");
            });
        }
	}
}
