const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Profile = connection.define('profile', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
});

module.exports = { Profile };