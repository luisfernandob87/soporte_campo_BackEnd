const express = require('express');

// Controllers
const {
    getAllCasos,
    getCasoById,
    createCaso,
    updateCaso,
    deleteCaso,
    getCasoById_Usuario
} = require('../controllers/casos.controller');

// Middlewares
const { casoExists } = require('../middlewares/casos.middlewares');
const { userExists } = require('../middlewares/users.middlewares');
const { tiendaExists } = require('../middlewares/tiendas.middlewares');

const router = express.Router();

router.get('/', getAllCasos);

router.get('/:id_caso', casoExists, getCasoById);

router.get('/caso/:idUsuario', getCasoById_Usuario);

router.post('/', createCaso);

router.patch('/:id_caso', casoExists, updateCaso);

router.delete('/:id_caso', casoExists, deleteCaso);

module.exports = { casosRouter: router };