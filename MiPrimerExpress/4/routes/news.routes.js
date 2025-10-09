// routes/news.routes.js
const express = require('express');
const router = express.Router();

// Importar el controlador de noticias
const newsController = require('../controllers/news.controller');

// Definir las rutas para el recurso 'news'
router.get('/', newsController.getAllNews);       // GET /news
router.post('/', newsController.createNews);      // POST /news
router.get('/:id', newsController.getNewsById);   // GET /news/:id
router.put('/:id', newsController.updateNews);    // PUT /news/:id
router.delete('/:id', newsController.deleteNews); // DELETE /news/:id

module.exports = router;