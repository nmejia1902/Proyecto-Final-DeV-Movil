const db = require('../db/database');

exports.obtenerPedidos = (req, res) => {
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
};

exports.crearPedido = (req, res) => {
  const { cliente_id, usuario_id, productos } = req.body;

  let total = 0;

  productos.forEach((p) => {
    total += p.precio * p.cantidad;
  });

  db.query(
    'INSERT INTO pedidos (cliente_id, usuario_id, total) VALUES (?, ?, ?)',
    [cliente_id, usuario_id, total],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const pedidoId = result.insertId;

      productos.forEach((p) => {
        const subtotal = p.precio * p.cantidad;

        db.query(
          'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, subtotal) VALUES (?, ?, ?, ?)',
          [pedidoId, p.id, p.cantidad, subtotal]
        );
      });

      res.json({ message: 'Pedido creado correctamente' });
    }
  );
};