var React = require("react");

var Navbar = React.createClass({
	render: function(){
		return (
			<div className='navbar-container'>
				<h2>{this.props.username}</h2>
				<a className="logout-button" href="/logout">Logout</a>;
			</div>
		)
	}
});

module.exports = Navbar;