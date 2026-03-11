const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING
    },
    direccion: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "clientes",
    timestamps: true
  }
);
module.exports = Cliente;