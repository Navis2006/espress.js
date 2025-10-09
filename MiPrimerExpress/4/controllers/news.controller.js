// controllers/news.controller.js

// Simulación de una base de datos en memoria
let news = [
    { id: 1, categoria_id: 1, estado_id: 1, usuario_id: 1, titulo: "Noticia de ejemplo 1", fecha_publicacion: "2023-10-26", description: "Descripción de la noticia 1", activo: true },
    { id: 2, categoria_id: 2, estado_id: 2, usuario_id: 2, titulo: "Noticia de ejemplo 2", fecha_publicacion: "2023-10-27", description: "Descripción de la noticia 2", activo: true }
];

// GET /news - Obtener todas las noticias
exports.getAllNews = (req, res) => {
    try {
        res.status(200).json({
            message: "Noticias obtenidas correctamente",
            data: news
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// GET /news/:id - Obtener una noticia por su id
exports.getNewsById = (req, res) => {
    try {
        const newsId = parseInt(req.params.id);
        const singleNews = news.find(n => n.id === newsId);

        if (!singleNews) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }

        res.status(200).json({
            message: "Noticia encontrada",
            data: singleNews
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// POST /news - Crear una noticia
exports.createNews = (req, res) => {
    try {
        const { categoria_id, estado_id, usuario_id, titulo, fecha_publicacion, description, image } = req.body;
        
        if (!titulo || !description) {
            return res.status(400).json({ message: "El título y la descripción son requeridos." });
        }

        const newNews = {
            id: news.length + 1, // Simulación de ID autoincremental
            categoria_id,
            estado_id,
            usuario_id,
            titulo,
            fecha_publicacion,
            description,
            image,
            activo: true, // Por defecto, una noticia creada está activa (pendiente de aprobación)
            UserAlta: "System", // Simulación
            FechaAlta: new Date().toISOString()
        };

        news.push(newNews);

        res.status(201).json({
            message: "Noticia creada exitosamente",
            data: newNews
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// PUT /news/:id - Actualizar una noticia por su id
exports.updateNews = (req, res) => {
    try {
        const newsId = parseInt(req.params.id);
        const newsIndex = news.findIndex(n => n.id === newsId);

        if (newsIndex === -1) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }

        const updatedNews = { ...news[newsIndex], ...req.body, FechaMod: new Date().toISOString() };
        news[newsIndex] = updatedNews;

        res.status(200).json({
            message: "Noticia actualizada correctamente",
            data: updatedNews
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// DELETE /news/:id - Eliminar una noticia por su id
exports.deleteNews = (req, res) => {
    try {
        const newsId = parseInt(req.params.id);
        const newsIndex = news.findIndex(n => n.id === newsId);

        if (newsIndex === -1) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }
        
        // Simulación de borrado lógico
        news[newsIndex].activo = false;
        news[newsIndex].FechaBaja = new Date().toISOString();

        res.status(200).json({ message: "Noticia eliminada (marcada como inactiva) correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};