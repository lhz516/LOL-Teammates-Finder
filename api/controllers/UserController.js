/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// signup: function (req, res, next){
		
	// 	return next();
	// },
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
	update: function (req, res, next){
		console.log(req.param('id'));
		User.update({id: req.param('id')},{
			s_name: req.param('s_name'),
			rank: req.param('rank'),
			play_time: req.param('play_time'),
			ifskype: req.param('ifskype'),
			language: req.param('language')
		}).exec(function (err,updated){
			console.log("updated");
			return res.send(updated);
		}) ;
	},
	getUsers: function (req, res, next){

		User.find({}).exec(function findCB(err, users){
  			return res.send(users);
		});
	}
};

