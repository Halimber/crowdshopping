var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('haCategoria', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		categoria:{type: DataTypes.STRING }
}, {
	tableName: 'ha_categoria',
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