const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const State = connection.define('state', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  abreviacion: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  UserAlta: {
    type: DataTypes.STRING(30),
    defaultValue: "Admin"
  },
  FechaAlta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  UserMod: {
    type: DataTypes.STRING(30),
    defaultValue: ""
  },
  FechaMod: {
    type: DataTypes.DATE,
    defaultValue: '1990-01-01T00:00:00.000Z'
  },
  UserBaja: {
    type: DataTypes.STRING(30),
    defaultValue: ""
  },
  FechaBaja: {
    type: DataTypes.DATE,
    defaultValue: '1990-01-01T00:00:00.000Z'
  }
});

module.exports = { State };