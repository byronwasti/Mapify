var React = require("react");

var TripPlanner = React.createClass({

	getInitialState: function(){
		return {
			'Origin':'',
			'Destination':''
		}
	},

	onComplete: function(){
		this.props.updateWaypoints(this.state)
	},

	onWaypointChange: function(e){
		var state = {};
		state[e.target.placeholder] = e.target.value;
		this.setState(state)
	},

	render: function(){
		return (
			<div>
				<WaypointInput
					type='Origin'
					onWaypointChange={this.onWaypointChange}
					onComplete={this.onComplete}
				/>
				<WaypointInput
					type='Destination'
					onWaypointChange={this.onWaypointChange}
					onComplete={this.onComplete}
				/>
			</div>
		)
	}
});

var WaypointInput = React.createClass({


	render: function(){
		return(
			<input 
				type="text" 
				placeholder={this.props.type} 
				onChange={this.props.onWaypointChange} 
				onBlur={this.props.onComplete}
			/>
		)
	}
})

module.exports = TripPlanner;