// Models
const { Tienda } = require('../models/tienda.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const tiendaExists = catchAsync(async (req, res, next) => {
	const { id_tienda } = req.params;

	const tienda = await Tienda.findOne({
		where: { id_tienda, status: 'Activo' },
	});

	if (!tienda) {
		return next(new AppError('Tienda no encontrada', 404));
	}

	req.tienda = tienda;
	next();
});

module.exports = {
	tiendaExists,
};