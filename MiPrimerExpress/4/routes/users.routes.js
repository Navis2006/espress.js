// routes/users.routes.js
const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const usersController = require('../controllers/users.controller');

// NOTA: En una aplicación real, estas rutas deberían estar protegidas
// y solo ser accesibles para usuarios con rol de 'Administrador'.

// Definir las rutas para el recurso 'users'
router.get('/', usersController.getAllUsers);     // GET /users
router.post('/', usersController.createUser);     // POST /users
router.get('/:id', usersController.getUserById);  // GET /users/:id
router.put('/:id', usersController.updateUser);   // PUT /users/:id
router.delete('/:id', usersController.deleteUser); // DELETE /users/:id

module.exports = router;