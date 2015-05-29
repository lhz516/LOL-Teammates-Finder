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
		unique:true
	},
	password:{
		type:'string',
		unique:true
	}
  }
};

