const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Crear producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, imagen],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Producto creado correctamente' });
    }
  );
});

// Eliminar producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Producto eliminado correctamente' });
  });
});

module.exports = router;