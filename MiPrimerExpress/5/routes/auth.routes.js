// routes/auth.routes.js
const express = require('express');
const router = express.Router();

// Importar el controlador de autenticación
const authController = require('../controllers/auth.controller');

// Definir las rutas de autenticación
router.post('/login', authController.login);        // POST /auth/login
router.post('/registro', authController.register); // POST /auth/registro

module.exports = router;