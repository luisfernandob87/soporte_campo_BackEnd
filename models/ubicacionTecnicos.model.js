const { db, DataTypes } = require('../utils/database.util');

const UbicacionTecnicos = db.define('ubicacionTecnicos', {
	id_ubicacion: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	latitud: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	longitud: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Activo',
	},
});
module.exports = { UbicacionTecnicos };
