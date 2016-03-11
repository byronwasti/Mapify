var React = require("react");
var css = require("./sidebar.scss");

var CONTENTMAP = 'map',
	CONTENTMUSIC = 'music',
	CONTENTPLAYLIST = 'playlist';

var Sidebar = React.createClass({
	render: function(){

		var mapStyle = {};
		var musicStyle = {};
		var playlistStyle = {};

		var highlightStyle = {
		  'background': '#616161',
		  'border-radius': '1em',
		  'padding-left': '10px',
		  'padding-right': '10px'
		};

		switch(this.props.contentStatus){
			case CONTENTMAP:
				mapStyle = highlightStyle;
				break;

			case CONTENTMUSIC:
				musicStyle = highlightStyle;
				break;

			case CONTENTPLAYLIST:
				playlistStyle = highlightStyle;
				break;
		}

		return (
			<div className="sidebar-container">
				<div style={mapStyle}><h2 className="header-1"><span><i className="material-icons">navigation</i></span>Map</h2></div>
				<div style={musicStyle}><h2 className="header-2"><span><i className="material-icons">music_note</i></span>Music</h2></div>
				<div style={playlistStyle}><h2 className="header-3"><span><i className="material-icons">playlist_play</i></span>Playlist</h2></div>
			</div>
		)
	}
});

module.exports = Sidebar;