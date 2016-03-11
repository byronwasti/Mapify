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

        lookupMusic: function(req, res){
            echonest_search(req, res);
        }

	}
}
