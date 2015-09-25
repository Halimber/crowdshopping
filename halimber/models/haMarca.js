var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('haMarca', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		marca:{type: DataTypes.STRING }
}, {
	tableName: 'ha_marca',
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