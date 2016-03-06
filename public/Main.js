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
		return {loginshow: '', logoutshow:'none', user:''};
	},

	loginSpotify: function(){
		$.ajax({
	      url: 'login',
	      dataType: 'json',
	      type: 'GET',
	      success: function(data) {
	      	this.setState({user: data, loginshow:'none', logoutshow:''});
	        console.log("Data:" + data);
	      }.bind(this),
	      error: function(xhr, status, err) {
        	this.setState({user: '',loginshow:'',logoutshow:'none'});
	      	console.log(err);
	      }.bind(this)
    	});
	},

	componentDidMount: function(){
		this.loginSpotify();
	},

	render: function(){
		var loginshow=  this.state.loginshow;
		var logoutshow = this.state.logoutshow;

		return (
			<div className="login-box">
				<a style={{display:loginshow}} className="login-button" href="/auth/spotify">Login with Spotify</a>
				<a style={{display:logoutshow}} className="logout-button" href="/logout">Logout</a>
				<p>Hello: {this.state.user.username}</p>
			</div>
		);
	}
});

ReactDOM.render(
	<App url='/'/>, 
	document.getElementById('content')
);
