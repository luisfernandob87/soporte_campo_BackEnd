const { Casos } = require('../models/casos.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllCasos = catchAsync(async (req, res, next) => {
    const casos = await Casos.findAll({
        where: { status: 'Activo' }
    });

    res.status(200).json({
        status: 'success',
        data: { casos }
    });
});

const getCasoById = catchAsync(async (req, res, next) => {
    const { id_caso } = req.params;
    
    const caso = await Casos.findOne({
        where: { id_caso, status: 'Activo' }
    });

    if (!caso) {
        return next(new AppError('Caso no encontrado', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { caso }
    });
});

const getCasoById_Usuario = catchAsync(async (req, res, next) => {
    const { idUsuario } = req.params;
    
    const caso = await Casos.findAll({
        where: { idUsuario, status: 'Activo' }
    });

    if (!caso) {
        return next(new AppError('Caso no encontrado', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { caso }
    });
});

const createCaso = catchAsync(async (req, res, next) => {
    const { ticket,  idUsuario, idTienda } = req.body;

    const newCaso = await Casos.create({
        ticket,
        resolucion: '',
        estadoCaso: 'Asignado',
        idUsuario,
        idTienda
    });

    res.status(201).json({
        status: 'success',
        data: { newCaso }
    });
});

const updateCaso = catchAsync(async (req, res, next) => {
    const { id_caso } = req.params;
    const { ticket, resolucion, estadoCaso, status } = req.body;

    const caso = await Casos.findOne({
        where: { id_caso, status: 'Activo' }
    });

    if (!caso) {
        return next(new AppError('Caso no encontrado', 404));
    }

    await caso.update({
        ticket,
        resolucion,
        estadoCaso,
        status
    });

    res.status(200).json({
        status: 'success',
        data: { caso }
    });
});

const deleteCaso = catchAsync(async (req, res, next) => {
    const { id_caso } = req.params;

    const caso = await Casos.findOne({
        where: { id_caso, status: 'Activo' }
    });

    if (!caso) {
        return next(new AppError('Caso no encontrado', 404));
    }

    await caso.update({ status: 'Inactivo' });

    res.status(200).json({
        status: 'success'
    });
});

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    deleteCaso,
    getCasoById_Usuario
};