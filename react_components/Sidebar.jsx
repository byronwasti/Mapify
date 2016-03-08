var React = require("react");

var CONTENTMAP = 'map',
	CONTENTMUSIC = 'music',
	CONTENTPLAYLIST = 'playlist';

var Sidebar = React.createClass({
	render: function(){
		return (
			<div className="sidebar-container">
				<h2>Map</h2>
				<h2>Music</h2>
				<h2>Playlist</h2>
			</div>
		)
	}
});

module.exports = Sidebar;