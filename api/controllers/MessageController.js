/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getMsg: function (req, res, next){
		Message.find({to:req.param('id')}).exec(function(err,msgs){
			return res.send(msgs);
		});
	}
};

