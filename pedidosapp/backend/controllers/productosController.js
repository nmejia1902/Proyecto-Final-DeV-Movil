const db = require('../db/database');

exports.obtenerProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.crearProducto = (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;

  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, imagen],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Producto creado correctamente' });
    }
  );
};

exports.eliminarProducto = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Producto eliminado correctamente' });
  });
};