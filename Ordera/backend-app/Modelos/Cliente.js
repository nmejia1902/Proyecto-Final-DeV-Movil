const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Cliente = sequelize.define(
  "cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING,
    },

    telefono: {
      type: DataTypes.STRING,
    },

    direccion: {
      type: DataTypes.STRING,
    },

    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "cliente",
    timestamps: false,
  }
);

module.exports = Cliente;