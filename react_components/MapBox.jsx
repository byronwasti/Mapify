var React = require("react");
var Map = require('./Map');
var TripPlanner = require('./TripPlanner');
var css = require('./mapbox.scss');

var MapBox = React.createClass({

	getInitialState: function(){
		return {
			route:{
				waypoints:[
					{
						name: 'Oakland, CA',
			            placeId: '',
            			placeDetails: ''
					},
					{
						name: 'Needham, MA',
						placeId: '',
						placeDetails:''
					}
				],
				stats:{
					duration:{
						text:''
					},
					distance:{
						text:''
					}
				}
			}
		}
	},

	submitRoute: function(){
		var data = {
			duration: this.state.route.stats.duration.value
		}

 		$.ajax({
	    	url: this.props.url,
	    	type: 'POST',
	    	dataType: 'json',
	    	data: data,
	    	success: function(response){
	    		console.log(response);
	    		this.props.goToMusic();
	    	}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(this.props.url, status, err.toString());
	      	}.bind(this)
    	});
	},

	updateRouteStats: function(newStats){
		var route = this.state.route;
		route.stats = newStats;

		this.setState({
			route: route
		})
	},

	updateWaypoints: function(newWaypoints){

		var route = this.state.route;

		route.waypoints = newWaypoints;

		this.setState({
			route: route
		});
	},

	render: function(){
		return (
			<div className = "mapbox-container">
				<TripPlanner
					updateWaypoints={this.updateWaypoints}
					mapService={this.props.mapService}
					route={this.state.route}
					onSubmitRoute={this.submitRoute}/>
				<Map
					mapService = {this.props.mapService}
					route = {this.state.route}
					updateRouteStats = {this.updateRouteStats}/>
			</div>
		)
	}
});

module.exports = MapBox;
