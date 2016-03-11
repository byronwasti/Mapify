var React = require("react");
var css = require('./navbar.scss');

var Navbar = React.createClass({
	render: function(){
		return (
			<div className='navbar-container'>
				<img className="logo-nav" src="/images/logo.png" />
				<h2 className='navbar-name'>{this.props.username}
				<span><a className="logout-button" href="/logout">LOGOUT</a></span></h2>
				
			</div>
		)
	}
});

module.exports = Navbar;