const { db, DataTypes } = require('../utils/database.util');

const Casos = db.define('casos', {
	id_caso: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	ticket: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	resolucion: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	estadoCaso: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Activo',
	},
});

module.exports = { Casos };
