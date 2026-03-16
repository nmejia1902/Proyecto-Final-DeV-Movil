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

/* =========================================
RELACIONES ENTRE MODELOS
========================================= */

Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });
Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });

Usuario.hasMany(Pedido, { foreignKey: "usuario_id" });
Pedido.belongsTo(Usuario, { foreignKey: "usuario_id" });

Estado.hasMany(Pedido, { foreignKey: "estado_id" });
Pedido.belongsTo(Estado, { foreignKey: "estado_id" });

Pedido.hasMany(DetallePedido, { foreignKey: "pedido_id" });
DetallePedido.belongsTo(Pedido, { foreignKey: "pedido_id" });

Producto.hasMany(DetallePedido, { foreignKey: "producto_id" });
DetallePedido.belongsTo(Producto, { foreignKey: "producto_id" });

/* =========================================
LOGIN
========================================= */

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

/* =========================================
REGISTRO DE USUARIO
========================================= */

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

/* =========================================
CLIENTES
========================================= */

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

    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

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

    const nuevo = await Cliente.create({
      nombre,
      telefono,
      direccion
    });

    res.status(200).json({
      msg: "Cliente creado correctamente",
      data: nuevo
    });

  } catch (error) {

    res.status(500).json({ error: error.message || error });

  }

});

app.put("/clientes/:id", async (req, res) => {

  const { nombre, telefono, direccion } = req.body;

  try {

    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    await cliente.update({
      nombre,
      telefono,
      direccion
    });

    res.status(200).json({
      msg: "Cliente actualizado",
      data: cliente
    });

  } catch (error) {

    res.status(500).json({ error: error.message || error });

  }

});

/* =========================================
CREAR PEDIDO
========================================= */

app.post("/pedidos", async (req, res) => {

  const { cliente_id, usuario_id, detalles } = req.body;

  if (!cliente_id || !detalles || detalles.length === 0) {

    return res.status(400).json({
      msg: "Se requiere cliente_id y al menos un producto en detalles"
    });

  }

  const t = await sequelize.transaction();

  try {

    const total = detalles.reduce((acc, d) => acc + parseFloat(d.subtotal), 0);

    const pedido = await Pedido.create(
      {
        cliente_id,
        usuario_id,
        total,
        estado_id: 1
      },
      { transaction: t }
    );

    const detallesConPedido = detalles.map((d) => ({
      pedido_id: pedido.id,
      producto_id: d.producto_id,
      cantidad: d.cantidad,
      subtotal: d.subtotal
    }));

    await DetallePedido.bulkCreate(detallesConPedido, { transaction: t });

    await t.commit();

    res.status(200).json({
      msg: "Pedido registrado correctamente",
      data: { id: pedido.id, total }
    });

  } catch (error) {

    await t.rollback();
    res.status(500).json({ error: error.message || error });

  }

});

/* =========================================
LISTAR PEDIDOS
========================================= */

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
            { model: Producto, attributes: ["id", "nombre", "precio"] }
          ]
        }
      ],

      order: [["fecha", "DESC"]]

    });

    res.status(200).json(filas);

  } catch (error) {

    res.status(500).json({ error: error.message || error });

  }

});

/* =========================================
PRODUCTOS
========================================= */

app.get("/productos", async (req, res) => {

  try {

    const filas = await Producto.findAll({
      order: [["nombre", "ASC"]]
    });

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

    const nuevo = await Producto.create({
      nombre,
      descripcion,
      precio,
      imagen
    });

    res.status(200).json({
      msg: "Producto agregado al inventario",
      data: nuevo
    });

  } catch (error) {

    res.status(500).json({ error: error.message || error });

  }

});

app.delete("/productos/:id", async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await producto.destroy();

    res.status(200).json({
      msg: "Producto eliminado correctamente"
    });

  } catch (error) {

    res.status(500).json({ error: error.message || error });

  }

});

app.put("/pedidos/:id/estado", async (req, res) => {

 const { estado_id } = req.body;

 try {

  const pedido = await Pedido.findByPk(req.params.id);

  if (!pedido) {
   return res.status(404).json({ msg: "Pedido no encontrado" });
  }

  await pedido.update({ estado_id });

  res.status(200).json({
   msg: "Estado actualizado",
   data: pedido
  });

 } catch (error) {
  res.status(500).json({ error: error.message || error });
 }

});

/* =========================================
INICIO SERVIDOR
========================================= */

sequelize.sync({ alter: true });

app.listen(5000, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 5000");
});