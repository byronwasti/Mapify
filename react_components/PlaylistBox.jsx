var React = require("react");
var css = require("./playlistbox.scss");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
				<h1 className="playlist-header">Your Custom Playlist:</h1>
				<SongList
				songList={this.props.songList}/>
			</div>
		)
	}
});

var SongList = React.createClass({
	render: function(){
		var songNodes = this.props.songList.map(function(song, index){
			if (song){
				return (
					<Song 
						key={index}
						song={song} />
				);
			}
		}, this);

		return (
			<div className='song-list'>
				{songNodes}
			</div>
		)
	}

});

var Song = React.createClass({
    render: function(){
    	console.log("Props: ", this.props);
        return (
            <div className="song">
            	<input type="button" value="Play"/>
            	<p>{this.props.song.title}</p>
            	<p>{this.props.song.artist_name}</p>
    		</div>
        );
    }
});

module.exports = PlaylistBox;
