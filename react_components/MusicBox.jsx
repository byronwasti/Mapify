var React = require("react");
var css = require("./musicbox.scss");

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

		this.props.onMusicTypeSubmit(lookup);
		this.setState({input: ''});
	},

	render: function(){
		return (
			<form className="musicbox-container" onSubmit={this.handleSubmit}>
				<h1 className="musicbox-header">Favorite Artist?</h1>
				<input 
					className="musicbox-input"
					type="text" 
					placeholder="e.g. JAY-Z" 
					value={this.state.input}
					onChange={this.handleInputChange}/>
				<br />
				<input className="musicbox-generate" type="submit" value="GENERATE" /> 
			</form>
		)
	}
});



module.exports = MusicBox;
