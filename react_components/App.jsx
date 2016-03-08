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
		this.checkLogin()
	},

	getInitialState: function(){
		return {
			loggedIn: false,
			user: {user:{}},
			content: CONTENTMAP
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
					<Navbar
						username={this.state.user.displayName}
					/>
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
