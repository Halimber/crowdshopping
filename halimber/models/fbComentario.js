var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('fbComentario', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		fb_usuario_id:{type: DataTypes.INTEGER },
		fb_pagina_id:{type: DataTypes.INTEGER },
		comentario:{type: DataTypes.STRING }
}, {
	tableName: 'fb_comentario',
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