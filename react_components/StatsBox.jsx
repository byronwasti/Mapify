var React = require('react')

var StatsBox = React.createClass({
	render: function(){
		return (
			<div className = 'route-stats-containe'r>
				<h1>Trip Stats</h1>
				<p>Duration: {this.props.duration}</p>
				<p>Distance: {this.props.distance}</p>
			</div>
		)
	}
})

module.exports = StatsBox