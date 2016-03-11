var React = require('react')

var StatsBox = React.createClass({
	render: function(){
		return (
			<div className = 'route-stats-container'>
				<h1>Trip Stats</h1>
				<p><strong>Duration:</strong> {this.props.duration}</p>
				<p><strong>Distance:</strong> {this.props.distance}</p>
			</div>
		)
	}
})

module.exports = StatsBox