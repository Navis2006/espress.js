// routes/states.routes.js
const express = require('express');
const router = express.Router();

// Importar el controlador de estados
const statesController = require('../controllers/states.controller');

// Definir las rutas para el recurso 'states'
router.get('/', statesController.getAllStates);     // GET /states
router.post('/', statesController.createState);     // POST /states
router.get('/:id', statesController.getStateById);  // GET /states/:id
router.put('/:id', statesController.updateState);   // PUT /states/:id
router.delete('/:id', statesController.deleteState); // DELETE /states/:id

module.exports = router;