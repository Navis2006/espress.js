const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Category = connection.define('category', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  UserAlta: {
    type: DataTypes.STRING(20),
    defaultValue: "Admin"
  },
  FechaAlta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  UserMod: {
    type: DataTypes.STRING(20),
    defaultValue: ""
  },
  FechaMod: {
    type: DataTypes.DATE,
    defaultValue: '1990-01-01T00:00:00.000Z'
  },
  UserBaja: {
    type: DataTypes.STRING(20),
    defaultValue: ""
  },
  FechaBaja: {
    type: DataTypes.DATE,
    defaultValue: '1990-01-01T00:00:00.000Z'
  }
});

module.exports = { Category };