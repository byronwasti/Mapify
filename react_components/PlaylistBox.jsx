var React = require("react");
var css = require("./playlistbox.scss");

var PlaylistBox = React.createClass({
	render: function(){
		return (
			<div className="playlist-container">
				<h1 className="playlist-header">Your Custom Playlist:</h1>
				<SongList
				songList={this.props.songList}/>
				<AddButton onClick={this.props.addToSpotify}/>
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
            data: undefined,
            play_object: {}
        }
    },

    onClick: function(){
        if( this.state.play == true ){
            this.state.play_object.pause();
            this.setState({play: false});
        } else {
            if( this.state.data == undefined ){
                $.ajax({
                    url: '/api/thirtySecondSample',
                    dataType: 'json',
                    type: 'GET',
                    data: {id: this.props.song.tracks[0].foreign_id},
                    success: function(data){
                        var audio = new Audio(data.preview_url);
                        console.log(audio);
                        audio.play();
                        this.setState({data: data, play_object: audio, play: true});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.log("ERROR: " + err.error.error);
                    }
                });
            } else {
                this.state.play_object.play();
                this.setState({play: true});
            }
        }
    },
    render: function(){
    	console.log("Props: ", this.props);
        return (
            <div className="song">
            	<input className="play-button" type="button" value="Play"  onClick={this.onClick}/>
            	<p>{this.props.song.title} -- </p>
            	<p>{this.props.song.artist_name}</p>
    		</div>
        );
    }
});

var AddButton = React.createClass({
	render: function(){
		return (
			<input 
            onClick={this.props.onClick}
			type="button"
			value="ADD PLAYLIST TO SPOTIFY"
			className="add-button"/>
		);
	}
});

module.exports = PlaylistBox;
