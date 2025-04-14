const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('nombre')
		.isString()
		.withMessage('El nombre debe ser texto')
		.notEmpty()
		.withMessage('El nombre no puede estar vacío')
		.isLength({ min: 3 })
		.withMessage('El nombre debe tener al menos 3 caracteres'),
	body('usuario')
		.isString()
		.withMessage('El usuario debe ser texto')
		.notEmpty()
		.withMessage('El usuario no puede estar vacío')
		.isLength({ min: 3 })
		.withMessage('El usuario debe tener al menos 3 caracteres'),
	body('password')
		.isString()
		.withMessage('La contraseña debe ser texto')
		.notEmpty()
		.withMessage('La contraseña no puede estar vacía')
		.isLength({ min: 8 })
		.withMessage('La contraseña debe tener al menos 8 caracteres'),
	checkValidations,
];

module.exports = { createUserValidators };
