

var LoginBox = React.createClass({

	onClick: function(){

		console.log("CLICKED");
		this.setState({login:true});
	},

	render: function(){
		return (
			<div className="login-box">
				<a className="login-button" onClick={this.onClick}>Login with Spotify</a>
			</div>
		);
	}
});