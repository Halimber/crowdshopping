var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('haKeyword', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		keyword:{type: DataTypes.STRING }
}, {
	tableName: 'ha_keyword',
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