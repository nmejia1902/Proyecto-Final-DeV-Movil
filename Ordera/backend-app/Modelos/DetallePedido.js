const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const DetallePedido = sequelize.define("detalle_pedido", {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 pedido_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 producto_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 cantidad: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 subtotal: {
  type: DataTypes.DECIMAL,
  allowNull: false
 }
});

module.exports = DetallePedido;