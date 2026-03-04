const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obtener todos los clientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Crear cliente
router.post('/', (req, res) => {
  const { nombre, telefono, direccion } = req.body;

  db.query(
    'INSERT INTO clientes (nombre, telefono, direccion) VALUES (?, ?, ?)',
    [nombre, telefono, direccion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Cliente creado correctamente' });
    }
  );
});

// Eliminar cliente
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Cliente eliminado correctamente' });
  });
});

module.exports = router;