var React = require("react");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
                {this.props.songList.map(function(song){
                    return (<Song 
                        song={song}
                        />)
                })}
				<h1>I am a playlistbox!</h1>
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
