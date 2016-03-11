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

        lookupMusic: function(req, res){
            echonest_search(req, res);
        },

        thirtySecondSample: function(req, res){
            console.log(req.query);
            var id = req.query.id.split(':')[2];
            rp({
                method: 'GET',
                uri: 'https://api.spotify.com/v1/tracks/'+id,
                json: true
            })
            .then(function(result){
                res.json(result);
            })
            .catch(function(err){
                console.error(err.error.error);
                res.json(err);
            });
        }
	}
}
