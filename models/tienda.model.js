const { db, DataTypes } = require('../utils/database.util');
const { Casos } = require('./casos.model');

const Tienda = db.define('tienda', {
	id_tienda: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	cadena: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	latitud: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	longitud: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Activo',
	},
});

Tienda.hasMany(Casos, {
	foreignKey: 'idTienda',
	sourceKey: 'id_tienda',
});
Casos.belongsTo(Tienda, {
	foreignKey: 'idTienda',
	targetKey: 'id_tienda',	
})

module.exports = { Tienda };
