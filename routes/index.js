module.exports = function(){
	return {	
		// home: function(req, res){
		// 	res.json({user: req.user});
		// 	console.log("USERHOME: " + req.user);
		// },

		GETlogin: function(req, res){

			try {
			    var username = req.session.passport.user.username;

				User.findOne({username : username}, function (err, user) {
			        if (!user) {

			        	var user = new User();
			        	user.username = username

			            user.save(function(err){
			            	console.log("SAVING USER")
			            	res.json({username:username});
							return;
			            });
			        }else{
			        	console.log("now we're here")
		            	res.json({username:username});
						return;
			        }
			    });
			}
			catch(err) {
				console.log(err);
			}
		}
	}
}