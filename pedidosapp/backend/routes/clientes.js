const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.obtenerClientes);

router.post('/', clientesController.crearCliente);

router.delete('/:id', clientesController.eliminarCliente);

module.exports = router;