const express = require('express');

// Controllers
const {
    getAllTiendas,
    getTiendaById,
    createTienda,
    updateTienda,
    deleteTienda
} = require('../controllers/tiendas.controller');

// Middlewares
const { tiendaExists } = require('../middlewares/tiendas.middlewares');

const router = express.Router();

router.get('/', getAllTiendas);

router.get('/:id_tienda', tiendaExists, getTiendaById);

router.post('/', createTienda);

router.patch('/:id_tienda', tiendaExists, updateTienda);

router.delete('/:id_tienda', tiendaExists, deleteTienda);

module.exports = { tiendasRouter: router };