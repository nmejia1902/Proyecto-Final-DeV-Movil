const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    usuario: {
      type: DataTypes.STRING,
    },
    contrasenia: {
      type: DataTypes.STRING,
    },
     
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
