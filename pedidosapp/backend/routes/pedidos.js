const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obtener historial de pedidos
router.get('/', (req, res) => {
  const query = `
    SELECT p.id, p.total, p.fecha, c.nombre AS cliente
    FROM pedidos p
    JOIN clientes c ON p.cliente_id = c.id
    ORDER BY p.fecha DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Crear pedido con detalle
router.post('/', (req, res) => {
  const { cliente_id, usuario_id, productos } = req.body;

  let total = 0;

  productos.forEach((item) => {
    total += item.cantidad * item.precio;
  });

  db.query(
    'INSERT INTO pedidos (cliente_id, usuario_id, total) VALUES (?, ?, ?)',
    [cliente_id, usuario_id, total],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const pedidoId = result.insertId;

      productos.forEach((item) => {
        const subtotal = item.cantidad * item.precio;

        db.query(
          'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, subtotal) VALUES (?, ?, ?, ?)',
          [pedidoId, item.id, item.cantidad, subtotal]
        );
      });

      res.json({ message: 'Pedido creado correctamente' });
    }
  );
});

module.exports = router;