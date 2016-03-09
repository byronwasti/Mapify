var React = require("react");

var MusicBox = React.createClass({

	getInitialState: function(){
		return {input: ''};
	},

	handleInputChange: function(e){
		this.setState({input: e.target.value});
	},

	handleSubmit: function(e){
		e.preventDefault();
		var input = this.state.input;
		if (!input){
			return;
		}

		var lookup = {
			type: 'artist',
			input: input
		} 

		this.props.onMusicTypeSubmit({lookup: lookup});
		this.setState({input: ''});
	},

	render: function(){
		return (
			<form className="musicbox-container" onSubmit={this.handleSubmit}>
				<h1>I am a musicbox!</h1>
				<input 
					type="text" 
					placeholder="enter your favorite artist" 
					value={this.state.input}
					onChange={this.handleInputChange}/>
				<input type="submit" value="Generate" /> 
			</form>
		)
	}
});



module.exports = MusicBox;