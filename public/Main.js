// var React = require('react');
// var ReactDOM = require('react-dom');

var App = React.createClass({

	getInitialState: function(){
		return { user: ''};
	},

    render: function(){
        return (
        <div className="App">
        	<h1>Mapify</h1>
        	<LoginBox />
        </div>
        );
    }
});

var LoginBox = React.createClass({

	getInitialState: function(){
		return {loggedin: false, user:''};
	},

	loginSpotify: function(){
		$.ajax({
	      url: '/login',
	      dataType: 'json',
	      type: 'GET',
	      success: function(data) {
	      	this.setState({user: data, loggedin: true});
	        console.log("Name:" + data.displayName);
	      }.bind(this),
	      error: function(xhr, status, err) {
        	this.setState({user: '', loggedin: false});
	      	console.log("ERROR: " + err);
	      }.bind(this)
    	});
	},

	render: function(){

		if (this.state.loggedin === false){
			var displayLogin = <a className="login-button" onClick={this.loginSpotify} href="/auth/spotify" >Login with Spotify</a>;
		} else {
			var displayLogin = <a className="logout-button" href="/logout">Logout</a>
		}

		return (
			<div className="login-box">
				{displayLogin}
				<p>Hello: {this.state.user.displayName}</p>
			</div>
		);
	}
});

ReactDOM.render(
	<App url='/'/>, 
	document.getElementById('content')
);
