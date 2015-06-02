/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	id:{
		type:'int',
		unique:true,
		primaryKey:true,
		autoIncrement: true
	},
	username:{
		type:'string',
		unique:true
	},
	password:{
		type:'string',
		unique:true
	},
	s_name:{
		type:'string',
		unique:true,
	},
	rank:{
		type:'string',
	},
	play_time:{
		type:'string',
	},
	skype:{
		type:'string',
	},
	language:{
		type:'string',
	}
  }
};

