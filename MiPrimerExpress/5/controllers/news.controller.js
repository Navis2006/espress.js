const { New } = require('../models/NewModel');
const { Category } = require('../models/CategoryModel');
const { State } = require('../models/StateModel');
const { User } = require('../models/UserModel');

// GET /news
exports.getAllNews = async (req, res) => {
    try {
        const news = await New.findAll({
            where: { activo: true },
            include: [ // Incluir los modelos relacionados
                { model: Category, as: 'categoria', attributes: ['nombre'] },
                { model: State, as: 'estado', attributes: ['nombre'] },
                { model: User, as: 'usuario', attributes: ['nick'] }
            ]
        });
        res.status(200).json({ data: news });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las noticias", error: error.message });
    }
};

// GET /news/:id
exports.getNewsById = async (req, res) => {
    try {
        const singleNews = await New.findByPk(req.params.id, {
            include: [
                { model: Category, as: 'categoria', attributes: ['nombre'] },
                { model: State, as: 'estado', attributes: ['nombre'] },
                { model: User, as: 'usuario', attributes: ['nick', 'correo'] }
            ]
        });
        if (!singleNews || !singleNews.activo) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }
        res.status(200).json({ data: singleNews });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la noticia", error: error.message });
    }
};

// POST /news
exports.createNews = async (req, res) => {
    try {
        const newNews = await New.create(req.body);
        res.status(201).json({
            message: "Noticia creada exitosamente",
            data: newNews
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la noticia", error: error.message });
    }
};

// PUT /news/:id
exports.updateNews = async (req, res) => {
    try {
        const [updatedRows] = await New.update(req.body, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }
        
        const updatedNew = await New.findByPk(req.params.id);
        res.status(200).json({
            message: "Noticia actualizada correctamente",
            data: updatedNew
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la noticia", error: error.message });
    }
};

// DELETE /news/:id
exports.deleteNews = async (req, res) => {
    try {
        const [updatedRows] = await New.update({ activo: false }, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }

        res.status(200).json({ message: "Noticia eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la noticia", error: error.message });
    }
};