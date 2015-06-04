/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema: true,
  attributes: {
  	id:{
		type:'int',
		unique:true,
		primaryKey:true,
		autoIncrement: true
	},
	username:{
		type:'string',
		unique:true,
		defaultsTo: ''
	},
	password:{
		type:'string',
		defaultsTo: ''
	},
	s_name:{
		type:'string',
		defaultsTo: ''
	},
	rank:{
		type:'string',
		defaultsTo: 'Unranked'
	},
	play_time:{
		type:'string',
		defaultsTo: 'Anytime'

	},
	ifskype:{
		type:'string',
		defaultsTo: 'No'
	},
	language:{
		type:'string',
		defaultsTo: ''
	},
	toJSON: function(){
		var obj = this.toObject();
		delete obj.password;
		delete obj.createdAt;
		delete obj.updatedAt;
	//	delete obj._csrf;
		return obj;
	}
  }
};

