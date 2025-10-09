const Sequelize = require('sequelize');

const connection = new Sequelize('db_news', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false });


connection.authenticate()
    .then(() => {
        console.log('CONEXIÓN EXITOSA: Se ha establecido conexión con la base de datos');
    })
    .catch(err => {
        console.error('ERROR DE CONEXIÓN: No se pudo conectar a la base de datos:', err);
    });

module.exports = { connection };