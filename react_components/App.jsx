var React = require('react');
var ReactDOM = require('react-dom');

var Map = require('./Map.jsx')
var LoginBox = require('./LoginBox.jsx')
var Navbar = require('./Navbar.jsx')
var PlaylistBox = require('./PlaylistBox.jsx')
var TripPlanner = require('./TripPlanner.jsx')

var App = React.createClass({
	getInitialState: function(){
		return {

		}
	},

	render: function(){
		return (
			<h1>Hello world!</h1>
		)
	}
});

ReactDOM.render(
	<App/>,
	document.getElementById('content')
);
