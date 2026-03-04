const db = require('../db/database');

exports.obtenerClientes = (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.crearCliente = (req, res) => {
  const { nombre, telefono, direccion } = req.body;

  db.query(
    'INSERT INTO clientes (nombre, telefono, direccion) VALUES (?, ?, ?)',
    [nombre, telefono, direccion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Cliente creado correctamente' });
    }
  );
};

exports.eliminarCliente = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Cliente eliminado correctamente' });
  });
};