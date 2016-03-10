var React = require("react");

var Map = require('./Map')
var TripPlanner = require('./TripPlanner')

var MapBox = React.createClass({

	getInitialState: function(){
		return {
			waypoints: {
				'Origin': '',
				'Destination': ''
			}
		}
	},

	updateWaypoints: function(newWaypoints){
		this.setState({
			waypoints: newWaypoints
		})
	},

	render: function(){
		return (
			<div className = "mapbox-container">
				<TripPlanner
					updateWaypoints={this.updateWaypoints}
				/>
				<Map
					mapService = {this.props.mapService}
					waypoints = {this.state.waypoints}
				/>
			</div>
		)
	}
});

module.exports = MapBox;