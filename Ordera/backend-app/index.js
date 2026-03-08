require("dotenv").config();
const express = require("express");
const sequelize = require("./conexion/database");
const cors = require("cors");

const Usuario = require("./Modelos/Usuario");
const Cliente = require("./Modelos/Cliente");
const Producto = require("./Modelos/Producto");
const Estado = require("./Modelos/Estado");
const Pedido = require("./Modelos/Pedido");
const DetallePedido = require("./Modelos/DetallePedido");

const app = express();
app.use(cors());
app.use(express.json());

//LOGIN

app.post("/login", async (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).json({ msg: "Faltan datos de login" });
  }

  try {
    const found = await Usuario.findOne({ where: { usuario, contrasenia } });

    if (!found) {
      return res.status(400).json({ msg: "Usuario o contraseña incorrectos" });
    }

    res.status(200).json({
      msg: "Login correcto",
      data: { id: found.id, usuario: found.usuario },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// PANTALLA 2 - REGISTRO
// POST /registro
// Tabla: usuario
// =========================================
app.post("/registro", async (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).json({ msg: "Faltan campos obligatorios" });
  }

  try {
    const existe = await Usuario.findOne({ where: { usuario } });
    if (existe) {
      return res.status(400).json({ msg: "El usuario ya está registrado" });
    }

    const nuevo = await Usuario.create({ usuario, contrasenia });
    res.status(200).json({
      msg: "Usuario registrado correctamente",
      data: { id: nuevo.id, usuario: nuevo.usuario },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// PANTALLA 3 - REGISTRO DE CLIENTES
// GET    /clientes         -> listar todos
// GET    /clientes/:id     -> obtener uno
// POST   /clientes         -> crear
// PUT    /clientes/:id     -> editar
// Tabla: cliente
// =========================================
app.get("/clientes", async (req, res) => {
  try {
    const filas = await Cliente.findAll({ order: [["nombre", "ASC"]] });
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.get("/clientes/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.post("/clientes", async (req, res) => {
  const { nombre, telefono, direccion } = req.body;

  if (!nombre) {
    return res.status(400).json({ msg: "El nombre del cliente es obligatorio" });
  }

  try {
    const nuevo = await Cliente.create({ nombre, telefono, direccion });
    res.status(200).json({ msg: "Cliente creado correctamente", data: nuevo });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.put("/clientes/:id", async (req, res) => {
  const { nombre, telefono, direccion } = req.body;
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    await cliente.update({ nombre, telefono, direccion });
    res.status(200).json({ msg: "Cliente actualizado", data: cliente });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// PANTALLA 4 - REGISTRAR PEDIDO CON PRODUCTOS
// POST /pedidos
// Tablas: pedido, detalle_pedido
// (usa GET /clientes y GET /productos para los selects)
// =========================================
app.post("/pedidos", async (req, res) => {
  const { cliente_id, usuario_id, detalles } = req.body;
  // detalles: [{ producto_id, cantidad, subtotal }]

  if (!cliente_id || !detalles || detalles.length === 0) {
    return res
      .status(400)
      .json({ msg: "Se requiere cliente_id y al menos un producto en detalles" });
  }

  const t = await sequelize.transaction();
  try {
    const total = detalles.reduce((acc, d) => acc + parseFloat(d.subtotal), 0);

    const pedido = await Pedido.create(
      { cliente_id, usuario_id, total, estado_id: 1 },
      { transaction: t }
    );

    const detallesConPedido = detalles.map((d) => ({
      pedido_id: pedido.id,
      producto_id: d.producto_id,
      cantidad: d.cantidad,
      subtotal: d.subtotal,
    }));

    await DetallePedido.bulkCreate(detallesConPedido, { transaction: t });

    await t.commit();
    res.status(200).json({
      msg: "Pedido registrado correctamente",
      data: { id: pedido.id, total },
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// PANTALLA 5 - VER PEDIDOS Y ACTUALIZAR ESTADO
// GET /pedidos              -> listar todos con relaciones
// GET /pedidos/:id          -> detalle de un pedido
// PUT /pedidos/:id/estado   -> cambiar estado
// GET /estados              -> para el select de estados
// Tablas: pedido, estado
// =========================================
app.get("/pedidos", async (req, res) => {
  try {
    const filas = await Pedido.findAll({
      include: [
        { model: Cliente, attributes: ["id", "nombre", "telefono"] },
        { model: Usuario, attributes: ["id", "usuario"] },
        { model: Estado, attributes: ["id", "nombre"] },
        {
          model: DetallePedido,
          include: [
            { model: Producto, attributes: ["id", "nombre", "precio"] },
          ],
        },
      ],
      order: [["fecha", "DESC"]],
    });
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.get("/pedidos/:id", async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [
        { model: Cliente, attributes: ["id", "nombre", "telefono", "direccion"] },
        { model: Usuario, attributes: ["id", "usuario"] },
        { model: Estado, attributes: ["id", "nombre"] },
        {
          model: DetallePedido,
          include: [
            { model: Producto, attributes: ["id", "nombre", "precio", "imagen"] },
          ],
        },
      ],
    });

    if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.put("/pedidos/:id/estado", async (req, res) => {
  const { estado_id } = req.body;

  if (estado_id == null) {
    return res.status(400).json({ msg: "estado_id es obligatorio" });
  }

  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ msg: "Pedido no encontrado" });

    await pedido.update({ estado_id });
    res.status(200).json({ msg: "Estado del pedido actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.get("/estados", async (req, res) => {
  try {
    const filas = await Estado.findAll();
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// PANTALLA 6 - AGREGAR PRODUCTO AL INVENTARIO
// GET  /productos      -> listar productos
// POST /productos      -> crear producto
// Tabla: producto
// =========================================
app.get("/productos", async (req, res) => {
  try {
    const filas = await Producto.findAll({ order: [["nombre", "ASC"]] });
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

app.post("/productos", async (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;

  if (!nombre || precio == null) {
    return res.status(400).json({ msg: "Nombre y precio son obligatorios" });
  }

  try {
    const nuevo = await Producto.create({ nombre, descripcion, precio, imagen });
    res.status(200).json({ msg: "Producto agregado al inventario", data: nuevo });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// PANTALLA 7 - AGREGAR PRODUCTO A PEDIDO EXISTENTE
// POST /pedidos/:id/detalle
// Solo si el pedido NO está en estado "entregado"
// Tabla: detalle_pedido
// =========================================
app.post("/pedidos/:id/detalle", async (req, res) => {
  const { producto_id, cantidad, subtotal } = req.body;

  if (!producto_id || !cantidad || subtotal == null) {
    return res
      .status(400)
      .json({ msg: "producto_id, cantidad y subtotal son obligatorios" });
  }

  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [{ model: Estado, attributes: ["id", "nombre"] }],
    });

    if (!pedido) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }

    // Bloquear si el pedido ya fue entregado
    const nombreEstado = pedido.Estado?.nombre?.toLowerCase() || "";
    if (nombreEstado === "entregado") {
      return res
        .status(400)
        .json({ msg: "No se puede modificar un pedido que ya fue entregado" });
    }

    const t = await sequelize.transaction();
    try {
      const detalle = await DetallePedido.create(
        { pedido_id: pedido.id, producto_id, cantidad, subtotal },
        { transaction: t }
      );

      // Recalcular y actualizar el total del pedido
      const nuevoTotal = parseFloat(pedido.total) + parseFloat(subtotal);
      await pedido.update({ total: nuevoTotal }, { transaction: t });

      await t.commit();
      res.status(200).json({
        msg: "Producto agregado al pedido correctamente",
        data: detalle,
        nuevoTotal,
      });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message || err });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// =========================================
// INICIO SERVIDOR
// =========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Aplicación Ordera ejecutando en puerto ${PORT}`);
});
