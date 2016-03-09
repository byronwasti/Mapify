var React = require("react");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
				<h1>Your Custom Playlist</h1>
				<SongList/>
				<AddToSpotify />
			</div>
		)
	}
});

var SongList = React.createClass({

	render: function(){
		return(
		<div className="song-list">
			<ul>
				<li>Song 1 </li>
				<li>Song 2</li>
				<li>Song 3</li>
			</ul>
		</div>
		)
	}
});

var AddToSpotify = React.createClass({

	render: function(){
		return (

			<div className="add-to-spotify">
				<input type="button" value="ADD TO SPOTIFY" />
			</div>
		)
	}
});




module.exports = PlaylistBox;