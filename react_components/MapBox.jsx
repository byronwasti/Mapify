var React = require("react");

var Map = require('./Map')
var TripPlanner = require('./TripPlanner')

var MapBox = React.createClass({
	render: function(){
		return (
			<div className = "mapbox-container">
				<TripPlanner/>
				<Map/>
			</div>
		)
	}
});

module.exports = MapBox;