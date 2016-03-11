var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMaps = require('google-maps');

var MapBox = require('./MapBox')
var LoginBox = require('./LoginBox')
var Navbar = require('./Navbar')
var PlaylistBox = require('./PlaylistBox')
var MusicBox = require('./MusicBox')
var Sidebar = require('./Sidebar')
var css = require('./global.scss');

var CONTENTMAP = 'map',
	CONTENTMUSIC = 'music',
	CONTENTPLAYLIST = 'playlist';

var App = React.createClass({
	componentWillMount: function(){
		this.checkLogin()
	},

	getInitialState: function(){
		return {
			loggedIn: false,
			user: {user:{}},
            songList: [],
		}
	},

	checkLogin: function(){
        $.ajax({
			url: '/verifyLogin',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				if(data.user){
					this.setState({
						user: data.user,
						loggedIn: true,
						content: CONTENTMAP
					});
				} else {
					this.setState({
						user: {},
						loggedIn: false,
					});
				}
			}.bind(this),
			error: function(xhr, status, err) {
				this.setState({user: '', loggedIn: false});
				console.log("ERROR: " + err);
			}.bind(this)
        });
	},

	goToMusic: function(){
		this.setState({
			content: CONTENTMUSIC
		})
	},

	toMap: function(){
		this.setState({
			content: CONTENTMAP
		});
	},

	onMusicTypeSubmit: function(lookup){

		console.log("SUBMITTED FORM: ", lookup);

		$.ajax({
			url: '/api/lookupMusic',
			dataType: 'json',
			type: 'GET',
			data: lookup,
			success: function(data){
				console.log("Data Back: ", data);
                if(data.statusCode == 429){
                    alert("Sorry! Things broke because our API got overloaded. Please wait a minute and try again");
                }
                this.setState({content: CONTENTPLAYLIST, songList: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

    addPlaylistToSpotify: function(){
        console.log(this.state.songList);
        var that = this;
        var songs = this.state.songList.filter(function(elem){
            return elem.tracks[0] !== undefined;
        }).map(function(elem){
            if( elem.tracks[0] == undefined){
                console.log('FUCKING ERROR');
                console.log(elem);
            } else {
                return elem.tracks[0].foreign_id;
            }
        });
        $.ajax({
            url: '/api/playlist',
            dataType: 'json',
            type: 'POST',
            data: {songs: songs},
            success: function(data){
                console.log("Success!");
                alert('Added Playlist to Spotify! Another Route?');
                that.setState({content: CONTENTMAP});
            },
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
        });
    },

	render: function(){

		if (!this.state.loggedIn){
			var main = <LoginBox/>
		} else {
			var content;
			switch(this.state.content){
				case CONTENTMAP:
					content = (
						<MapBox
							mapService = {this.props.mapService}
							goToMusic = {this.goToMusic}
							url="/api/setDuration"/>
					)
					break;
				case CONTENTMUSIC:
					content = (
						<MusicBox 
							onMusicTypeSubmit={this.onMusicTypeSubmit}/>
					)
					break;
				case CONTENTPLAYLIST:
					content = (
						<PlaylistBox
                            addToSpotify={this.addPlaylistToSpotify}
                            songList={this.state.songList}
                            toMap={this.toMap}/>
					)
					break;
			}

			var main = (
				<div className="main-container">
					<Navbar
						username={this.state.user.displayName}/>
					<div className="content-container">
						<Sidebar 
							contentStatus={this.state.content}/>
						{content}
					</div>
				</div>
			)
		}

		return (
			<div className="App">
				{main}
			</div>
		)
	}
});

GoogleMaps.LIBRARIES = ['places'];
GoogleMaps.load(function (google) {
    ReactDOM.render(<App mapService={google}/>, document.getElementById('content'));
});
