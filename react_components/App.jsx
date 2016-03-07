var React = require('react');
var ReactDOM = require('react-dom');

var MapBox = require('./MapBox')
var LoginBox = require('./LoginBox')
var Navbar = require('./Navbar')
var PlaylistBox = require('./PlaylistBox')
var MusicBox = require('./MusicBox')
var Sidebar = require('./Sidebar')

var CONTENTMAP = 'map',
	CONTENTMUSIC = 'music',
	CONTENTPLAYLIST = 'playlist';

var App = React.createClass({
	componentWillMount: function(){
		console.log("I'm about to mount BITCH")
		this.checkLogin()
	},

	getInitialState: function(){
		console.log("Getting initial state")
		return {
			loggedIn: false,
			user: {user:{}},
			content: CONTENTMAP
		}
	},

	checkLogin: function(){
        $.ajax({
			url: '/login',
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

	render: function(){

		if (!this.state.loggedIn){
			console.log("Not logged in", this.state.loggedIn)
			var main = <LoginBox/>
		} else {
			console.log("Logged in", this.state.loggedIn)
			var content;
			switch(this.state.content){
				case CONTENTMAP:
					content = (
						<MapBox/>
					)
					break;
				case CONTENTMUSIC:
					content = (
						<MusicBox/>
					)
					break;
				case CONTENTPLAYLIST:
					content = (
						<PlaylistBox/>
					)
					break;
			}

			var main = (
				<div className="main-container">
					<Navbar/>
					<Sidebar/>
					{content}
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
	<App/>,
	document.getElementById('content')
);
