var rp = require('request-promise');
var request = require('request');
var async = require('async');
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

        spotifyPlaylist: function(req, res){
            var id = req.user.id;
            var spotify_auth = 'Bearer '+req.user.accessToken;
            rp({
                method: 'POST',
                uri: 'https://api.spotify.com/v1/users/'+id+'/playlists',
                body: {
                    name: 'Mapify'+Math.floor(Math.random()*10+1)
                },
                headers: {
                    Authorization:  spotify_auth,
                    'Content-Type': 'application/json'
                },
                json: true
            })
            .then(function(result){
                console.log(req.body);
                songs = req.body['songs[]'];
                console.log(songs);

                if( songs.length > 100 ){
                    songs.splice(0,99);
                }

                console.log(result.id);
                songs = songs.reduce(function(prev, cur){
                    return prev + ','+cur;
                });
                return rp({
                    method: 'POST',
                    uri: 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists/'+result.id+'/tracks',
                    headers: {
                        Authorization: 'Bearer ' + req.user.accessToken,
                        'Content-Type': 'application/json'
                    },
                    qs: {
                        'uris': songs
                    },
                    useQuerystring: true,
                });
            })
            .then(function(after){
                res.json({});
            })
            .catch(function(err){
                console.error(err);
                console.error(err.error.error);
            });
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
