const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		attributes: { exclude: ['password'] },
		where: { status: 'Activo' },
	});

	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { nombre, usuario, password} = req.body;


	// Encrypt the password
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		nombre,
		usuario,
		password: hashedPassword,
		rol: 'Usuario' ,
		latitud: 0,
		longitud: 0,
	});

	// Remove password from response
	newUser.password = undefined;

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { nombre, password, latitud, longitud } = req.body;
	const { user } = req;

	const updateData = { nombre };

	if (latitud !== undefined) updateData.latitud = latitud;
	if (longitud !== undefined) updateData.longitud = longitud;

	if (password) {
		// Encrypt the new password
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);
		updateData.password = hashedPassword;
	}

	await user.update(updateData);

	// Remove password from response
	user.password = undefined;

	res.status(200).json({
		status: 'success',
		data: { user },
	});
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'Eliminado' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
	// Get email and password from req.body
	const { usuario, password } = req.body;

	// Validate if the user exist with given username
	const user = await User.findOne({
		where: { usuario, status: 'Activo' },
	});

	// Compare passwords (entered password vs db password)
	// If user doesn't exists or passwords doesn't match, send error
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return next(new AppError('Credenciales incorrectas', 400));
	}

	// Remove password from response
	user.password = undefined;

	// Generate JWT (payload, secretOrPrivateKey, options)
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({
		status: 'success',
		data: { user, token },
	});
});

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
};
