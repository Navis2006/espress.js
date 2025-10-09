// routes/categories.routes.js
const express = require('express');
const router = express.Router();

// Importar el controlador de categorías
const categoriesController = require('../controllers/categories.controller');

// Definir las rutas para el recurso 'categories'
router.get('/', categoriesController.getAllCategories);    // GET /categories
router.post('/', categoriesController.createCategory);     // POST /categories
router.get('/:id', categoriesController.getCategoryById);  // GET /categories/:id
router.put('/:id', categoriesController.updateCategory);   // PUT /categories/:id
router.delete('/:id', categoriesController.deleteCategory);// DELETE /categories/:id

module.exports = router;