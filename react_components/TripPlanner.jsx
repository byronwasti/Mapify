var React = require("react");
var Waypoint = require("./Waypoint")
var StatsBox = require("./StatsBox")

var TripPlanner = React.createClass({

	getInitialState: function(){
		return {
            editingAt: -1,
            selected: -1
		}
	},

	onWaypointAction: function(index, action, options){
        switch (action) {
            case 'edit':
                this.editWayPoint(index);
                break;
            case 'save':
                this.saveWayPoint(index, options);
                break;
            case 'select':
                this.selectWayPoint(index);
                break;
        }
    },

    editWayPoint: function (index) {
        this.setState({
            editingAt: index
        });
    },

    saveWayPoint: function (index, options) {
        var wayPoints = this.props.route.waypoints,
            placeDetails = options.placeDetails || {};
        wayPoints[index] = {
            name: options.value,
            placeId: placeDetails.place_id,
            placeDetails: placeDetails
        };

        this.props.updateWaypoints(wayPoints)
        this.setState({
            editingAt: -1
        });
    },

    selectWayPoint: function (index) {
        this.setState({
            selected: index
        })
    },

	render: function(){
		var origin = this.props.route.waypoints[0]
		var destination = this.props.route.waypoints[1]

		return (
			<div className = "trip-planner-container">

				<div className = "trip-stats-container">
					<StatsBox
						duration={this.props.route.stats.duration.text}
						distance={this.props.route.stats.distance.text}/>
				</div>


				<div className = "waypoints-container">
					<Waypoint
	                    index={0}
	                    mapService={this.props.mapService}
	                    waypoint={origin}
	                    editing={this.state.editingAt === 0}
	                    selected={this.state.selected === 0}
	                    onAction={this.onWaypointAction.bind(this, 0)}/>

					<Waypoint
	                    index={1}
	                    mapService={this.props.mapService}
	                    waypoint={destination}
	                    editing={this.state.editingAt === 1}
	                    selected={this.state.selected === 1}
	                    onAction={this.onWaypointAction.bind(this, 1)}/>
	            </div>

	            <input
	            	className="submit-route-button"
	            	type="button"
	            	onClick={this.props.onSubmitRoute}
	            	value="Submit Route"/>
			</div>
		)
	}
});

module.exports = TripPlanner;
