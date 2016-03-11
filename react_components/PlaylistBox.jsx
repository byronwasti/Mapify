var React = require("react");
var css = require("./playlistbox.scss");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
				<h1 className="playlist-header">Your Custom Playlist:</h1>
				<AddButton />
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
    getInitialState: function(){
        return {
            play: false,
            data: undefined
        }
    },
    onClick: function(){
        $.ajax({
            url: '/api/thirtySecondSample',
            dataType: 'json',
            type: 'GET',
            data: {id: this.props.song.id},
            success: function(data){
                this.setState({data: data});
            }.bind(this),
			error: function(xhr, status, err) {
				console.log("ERROR: " + err);
			}
        });
    },
    render: function(){
    	console.log("Props: ", this.props);
        return (
            <div className="song">
            	<input className="play-button" type="button" value="Play"  onClick={this.onClick}/>
            	<p>{this.props.song.title}</p>
            	<p>{this.props.song.artist_name}</p>
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
