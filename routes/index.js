var rp = require('request-promise');
var request = require('request');
var async = require('async');
var auth = require('../auth');
var echonest_search = require('./echonest');

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

        setDuration: function(req, res){
            req.session.tripDuration = req.body;
            res.json({success: true});
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
            echonest_search(req, res);
        }

	}
}
