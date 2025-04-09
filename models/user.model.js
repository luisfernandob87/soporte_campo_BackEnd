const { db, DataTypes } = require('../utils/database.util');
const {Casos} = require('./casos.model');
const {UbicacionTecnicos} = require('./ubicacionTecnicos.model');

const User = db.define('user', {
	id_usuario: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	usuario: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rol: {
		type: DataTypes.STRING,
		defaultValue: 'Normal',
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Activo',
	},
});

User.hasMany(Casos, {
	foreignKey: 'idUsuario',
	sourceKey: 'id_usuario',
});

Casos.belongsTo(User, {
	foreignKey: 'idUsuario',
	targetKey: 'id_usuario',	
})

User.hasMany(UbicacionTecnicos, {
	foreignKey: 'idUsuario',
	sourceKey: 'id_usuario',	
})
UbicacionTecnicos.belongsTo(User, {
	foreignKey: 'idUsuario',
	targetKey: 'id_usuario',	
})

module.exports = { User };
