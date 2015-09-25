var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('haProducto', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		ha_marca_id:{type: DataTypes.INTEGER },
		ha_categoria_id:{type: DataTypes.INTEGER },
		producto:{type: DataTypes.STRING }
}, {
	tableName: 'ha_producto',
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