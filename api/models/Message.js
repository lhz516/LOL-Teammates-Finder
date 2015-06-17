/**
* Message.js
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
	from:{
		type:'string',
		defaultsTo: ''
	},
	to:{
		type:'string',
		defaultsTo: ''
	},
	content:{
		type:'string',
		defaultsTo: ''
	}
  }
};


