const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Pedido = sequelize.define("pedido", {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 cliente_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 usuario_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 total: {
  type: DataTypes.DECIMAL,
  allowNull: false
 },
 estado_id: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 fecha: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
 }
});

module.exports = Pedido;