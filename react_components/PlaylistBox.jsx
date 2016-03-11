var React = require("react");
var css = require("./playlistbox.scss");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
				<h1 className="playlist-header">Your Custom Playlist:</h1>
			</div>
		)
	}
});

var Song = React.createClass({
    render: function(){
        return (
                <div>
    <p> {this.props.song.title} <br/>
     --{this.props.song.artist_name} </p>
    </div>
               );
    }
});

module.exports = PlaylistBox;
