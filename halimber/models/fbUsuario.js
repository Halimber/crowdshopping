var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var Model = sequelize.define('fbUsuario', {
		id:{ type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
		correo: { type: DataTypes.STRING, validate: { isEmail: true, }, allowNull: true },
		nombres:{type: DataTypes.STRING },
		apellidos:{type: DataTypes.STRING },
		telefono:{type: DataTypes.STRING },
		fb_id:{type: DataTypes.STRING },
		estado:{type: DataTypes.STRING }
		//hashedPassword:{type: DataTypes.STRING},
		//salt:{type: DataTypes.STRING }
}, {
	tableName: 'fb_usuario',
	classMethods: {
		associate: function(models) {
			//Model.hasMany(models.usuario,{as:'parent', foreignKey:'parentId'})
		}
	},
	instanceMethods:{
		/*
		checkPassword: function(password){
			return this.encryptPassword(password, this.salt) === this.hashedPassword;
		},
		encryptPassword: function(password, salt){
			return crypto.createHmac('sha1', salt).update(password).digest('hex');
		},
		*/
	},
	getterMethods:{
		/*
		verifyPassword: function() { return this._verifyPassword },
		password: function(){ return this._password; }
		*/
	},
	setterMethods:{
		/*
		verifyPassword: function(v){ this._verifyPassword = v },
		password: function(password){
			console.log(password);
	        this.salt = crypto.randomBytes(32).toString('base64');
	        this.hashedPassword = this.encryptPassword(password,this.salt);
		}
		*/
	}
});

return Model
}