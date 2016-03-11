var rp = require('request-promise');
var request = require('request');
var async = require('async');
var auth = require('../auth');

var filterByTime = function(req, songs){
    // REMOVE THIS LINE
    var tmp_LONG_TIME = 1233;
    var total_time = 0;
    var output = [];
    console.log(songs.length);
    debugger;
    
    while( total_time < tmp_LONG_TIME ){
        if( songs.length < 1 ){
            return output;
        }

        // Select a random song
        var random = Math.floor(Math.random()*songs.length );
        console.log(random + ',' + songs.length);

        var song = songs[random];
        songs.splice(random, 1);

        //TODO:  Take a better look at this -- this is jank
        if( song == undefined ){
            console.log("Bad song : " + song);
            continue;
        }

        total_time += song.audio_summary.duration;
        output.push(song);
    }

    return output;
}

module.exports = function(req, res){
    rp({
        method: 'GET',
        uri: 'http://developer.echonest.com/api/v4/artist/similar',
        qs: {
            api_key: auth.ECHONEST_API_KEY,
            name: req.query.input,
            results: 30
        },
        json: true
    })
    .then(function(similar_artists){
        if( similar_artists.response.artists.length < 1 ){
            return res.json({success: false});
        }
        ids = similar_artists.response.artists.map(function(elem){
            return {
                method: 'GET',
                uri: 'http://developer.echonest.com/api/v4/song/search',
                qs: {
                    api_key: auth.ECHONEST_API_KEY,
                    artist_id: elem.id,
                    results: 30,
                    bucket: 'audio_summary'
                },
                json: true
            }
        });

        ids.push( {
            method: 'GET',
            uri: 'http://developer.echonest.com/api/v4/song/search',
            qs: {
                api_key: auth.ECHONEST_API_KEY,
                artist: req.query.input,
                results: 30,
                bucket: 'audio_summary'
            },
            json: true
        });

        async.map(ids, request, function(err, result){
            if( err ){
                console.error(err);
                res.json(err);
            }

            output = result.reduce(function(prev, cur){
                return prev.concat(cur.body.response.songs);
            }, []);

            time_sensitive_output = filterByTime(req, output);

            res.json(time_sensitive_output);
        });
    })
    .catch(function(err){
        console.error(err);
        res.json(err);
    });
};