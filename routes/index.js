module.exports = function(){
	return {	
		home: function(req, res){
			console.log("HELlo")
			res.end();
		}
	}
}