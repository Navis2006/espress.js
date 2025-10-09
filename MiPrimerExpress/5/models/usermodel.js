const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Profile } = require('./profilemodel');

const User = connection.define('user', {
    perfil_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nick: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    UserAlta: {
        type: DataTypes.STRING,
        defaultValue: "Admin"
    },
    FechaAlta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UserMod: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    FechaMod: {
        type: DataTypes.DATE,
        defaultValue: '1990-01-01T00:00:00.000Z'
    },
    UserBaja: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    FechaBaja: {
        type: DataTypes.DATE,
        defaultValue: '1990-01-01T00:00:00.000Z'
    }
});

// Relación: Un usuario pertenece a un perfil
User.belongsTo(Profile, { as: 'perfil', foreignKey: 'perfil_id' });

module.exports = { User };