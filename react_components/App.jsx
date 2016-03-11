var React = require('react');
var ReactDOM = require('react-dom');

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
            songList: []
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
						content: CONTENTMUSIC
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

	onMusicTypeSubmit: function(lookup){

		console.log("SUBMITTED FORM: ", lookup);

		$.ajax({
			//url: '/api/lookupMusic',
			url: '/api/spotify3',
			dataType: 'json',
			type: 'GET',
			data: lookup,
			success: function(data){
				console.log("Data Back: ", data);
                this.setState({content: CONTENTPLAYLIST, songList: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

    addPlaylistToSpotify: function(){
    },

	render: function(){

		if (!this.state.loggedIn){
			var main = <LoginBox/>
		} else {
			var content;
			switch(this.state.content){
				case CONTENTMAP:
					content = (
						<MapBox/>
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
                            />
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

ReactDOM.render(
	<App />,
	document.getElementById('content')
);
