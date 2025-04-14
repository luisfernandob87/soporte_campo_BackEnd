const { Tienda } = require('../models/tienda.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllTiendas = catchAsync(async (req, res, next) => {
    const tiendas = await Tienda.findAll({
        where: { status: 'Activo' }
    });

    res.status(200).json({
        status: 'success',
        data: { tiendas }
    });
});

const getTiendaById = catchAsync(async (req, res, next) => {
    const { id_tienda } = req.params;
    
    const tienda = await Tienda.findOne({
        where: { id_tienda, status: 'Activo' }
    });

    if (!tienda) {
        return next(new AppError('Tienda no encontrada', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { tienda }
    });
});

const createTienda = catchAsync(async (req, res, next) => {
    const { cadena, nombre, latitud, longitud } = req.body;

    const newTienda = await Tienda.create({
        cadena,
        nombre,
        latitud,
        longitud
    });

    res.status(201).json({
        status: 'success',
        data: { newTienda }
    });
});

const updateTienda = catchAsync(async (req, res, next) => {
    const { id_tienda } = req.params;
    const { cadena, nombre, latitud, longitud } = req.body;

    const tienda = await Tienda.findOne({
        where: { id_tienda, status: 'Activo' }
    });

    if (!tienda) {
        return next(new AppError('Tienda no encontrada', 404));
    }

    await tienda.update({
        cadena,
        nombre,
        latitud,
        longitud
    });

    res.status(200).json({
        status: 'success',
        data: { tienda }
    });
});

const deleteTienda = catchAsync(async (req, res, next) => {
    const { id_tienda } = req.params;

    const tienda = await Tienda.findOne({
        where: { id_tienda, status: 'Activo' }
    });

    if (!tienda) {
        return next(new AppError('Tienda no encontrada', 404));
    }

    await tienda.update({ status: 'Inactivo' });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = {
    getAllTiendas,
    getTiendaById,
    createTienda,
    updateTienda,
    deleteTienda
};