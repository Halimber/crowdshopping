var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('fbPagina', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		fb_usuario_id:{type: DataTypes.INTEGER },
		name:{type: DataTypes.STRING },
		category:{type: DataTypes.STRING },
		fb_id:{type: DataTypes.INTEGER }
}, {
	tableName: 'fb_pagina',
	classMethods: {
		associate: function(models) {
		}
	},
	instanceMethods:{
	},
	getterMethods:{
	},
	setterMethods:{
	}
});

return Model
}