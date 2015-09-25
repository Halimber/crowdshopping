var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('fbEvento', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		fb_usuario_id:{type: DataTypes.INTEGER },
		titulo:{type: DataTypes.STRING },
		fechayhora:{type: DataTypes.DATE }
}, {
	tableName: 'fb_evento',
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