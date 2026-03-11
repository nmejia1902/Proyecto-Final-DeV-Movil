const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Usuario = sequelize.define("usuario", {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 usuario: {
  type: DataTypes.STRING,
  allowNull: false
 },
 contrasenia: {
  type: DataTypes.STRING,
  allowNull: false
 }
});

module.exports = Usuario;