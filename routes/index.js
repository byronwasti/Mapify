module.exports = function(){
	return {	
		// home: function(req, res){
		// 	res.json({user: req.user});
		// 	console.log("USERHOME: " + req.user);
		// },

		GETlogin: function(req, res){

			console.log('Route User:' + req.user);
			res.json({user: req.user});
		}
	}
}