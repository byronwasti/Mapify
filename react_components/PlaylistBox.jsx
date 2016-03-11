var React = require("react");
var css = require("./playlistbox.scss");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
				<h1 className="playlist-header">Your Custom Playlist:</h1>
				<SongList
				songList={this.props.songList}/>
				<AddButton />
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
            	<input className="play-button" type="button" value="Play"/>
            	<p className="song-title">{this.props.song.title} -- </p>
            	<p className="song-artist">{this.props.song.artist_name}</p>
    		</div>
        );
    }
});

var AddButton = React.createClass({
	render: function(){
		return (
			<input 
			type="button"
			value="ADD PLAYLIST TO SPOTIFY"
			className="add-button"/>
		);
	}
});

module.exports = PlaylistBox;
