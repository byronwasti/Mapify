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
            req.user.tripDuration = req.body;
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
                    //I might have come up with better names, maybe the starting and ending city names?
                    name: 'Mapify'+Math.floor(Math.random()*10+1)
                },
                headers: {
                    Authorization:  spotify_auth,
                    'Content-Type': 'application/json'
                },
                json: true
            })
            .then(function(result){
                songs = req.body['songs[]'];
                if( typeof(songs.length) === typeof(Array) ){
                    songs = songs.filter(function(elem){
                        return elem.length == 36;
                    });
                }

                // Can only add 100 songs at a time...
                if( Number(songs.length) > 100 ){
                    var songsOptions = [];

                    for( var i = 0; i < (songs.length % 100); i++){
                        songsOptions.push( songs.splice(i*100,i*100+99) );
                    }
                } else {
                    var songsOptions = [songs];
                }

                // I prefer a more descriptive name than elem, like song, but that's just me
                songsOptions = songsOptions.map(function(elem){
                    return {
                        method: 'POST',
                        uri: 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists/'+result.id+'/tracks',
                        headers: {
                            Authorization: 'Bearer ' + req.user.accessToken,
                            'Content-Type': 'application/json'
                        },
                        body: {
                            uris: elem
                        },
                        json: true
                    }
                });

                // Why async map instead of return Promise.all(songOptions.map(options =>rp(options) )).then(res => res.json({err: false}))?
                async.map( songsOptions, request, function(err, results){
                    if( err ){
                        console.error(err);
                        res.json({error: true});
                    } else {
                        res.json({error: false});
                    }
                });
            })
            .catch(function(err){
                //probably should send error back up with res.status()
                console.error(err);
                console.error(err.error.error);
                console.error("There was an error :(");
            });
        },

        thirtySecondSample: function(req, res){
            // Get track sample from Spotify

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
                //say that three times fast :P
                console.error(err.error.error);
                //res.status(500).json(err)
                res.json(err);
            });
        }
	}
}
