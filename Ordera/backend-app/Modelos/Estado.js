const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Estado = sequelize.define("estado", {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 nombre: {
  type: DataTypes.STRING,
  allowNull: false
 }
});

module.exports = Estado;