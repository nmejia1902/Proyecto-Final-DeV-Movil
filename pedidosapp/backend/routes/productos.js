const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.obtenerProductos);

router.post('/', productosController.crearProducto);

router.delete('/:id', productosController.eliminarProducto);

module.exports = router;