// Models
const { Casos } = require('../models/casos.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const casoExists = catchAsync(async (req, res, next) => {
	const { id_caso } = req.params;

	const caso = await Casos.findOne({
		where: { id_caso, status: 'Activo' },
	});

	if (!caso) {
		return next(new AppError('Caso no encontrado', 404));
	}

	req.caso = caso;
	next();
});

module.exports = {
	casoExists,
};