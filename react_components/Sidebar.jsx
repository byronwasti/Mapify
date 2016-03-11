var React = require("react");
var css = require("./sidebar.scss");

var CONTENTMAP = 'map',
	CONTENTMUSIC = 'music',
	CONTENTPLAYLIST = 'playlist';

var Sidebar = React.createClass({
	render: function(){
		return (
			<div className="sidebar-container">
				<h2 className="header-1"><span><i className="material-icons">navigation</i></span>Map</h2>
				<h2 className="header-2"><span><i className="material-icons">music_note</i></span>Music</h2>
				<h2 className="header-3"><span><i className="material-icons">playlist_play</i></span>Playlist</h2>
			</div>
		)
	}
});

module.exports = Sidebar;