/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: function (req, res, next){
		
		return next();
	},
	login: function (req, res, next){

		var login_name = req.param('username');
		User.findOne({username: login_name}).exec(function findOneCB(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			if(user.password == req.param('password')){
				console.log("success");
				return res.send(user);
				//sails.sockets.emit(sails.sockets.id(req.socket), 'session-create',{msg:'Hi',user:user});
			}
		});

	},
	getUsers: function (req, res, next){
		User.find({}).exec(function findCB(err, users){
  			return res.send(users);
		});
	}
};

