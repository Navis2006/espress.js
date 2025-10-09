const { Category } = require('../models/CategoryModel');
// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
try {
const categories = await Category.findAll({ where: { activo: true } });
res.status(200).json({
message: "Categorías obtenidas correctamente",
data: categories
});
} catch (error) {
res.status(500).json({ message: "Error al obtener categorías", error: error.message });
}
};
// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
try {
const category = await Category.findByPk(req.params.id);
if (!category || !category.activo) {
return res.status(404).json({ message: "Categoría no encontrada" });
}
res.status(200).json({ data: category });
} catch (error) {
res.status(500).json({ message: "Error al obtener la categoría", error: error.message });
}
};
// Crear una nueva categoría
exports.createCategory = async (req, res) => {
try {
const newCategory = await Category.create(req.body);
res.status(201).json({
message: "Categoría creada exitosamente",
data: newCategory
});
} catch (error) {
res.status(500).json({ message: "Error al crear la categoría", error: error.message });
}
};
// Actualizar una categoría
exports.updateCategory = async (req, res) => {
try {
const [updatedRows] = await Category.update(req.body, {
where: { id: req.params.id }
});

if (updatedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
    }
    
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json({
        message: "Categoría actualizada correctamente",
        data: updatedCategory
    });
} catch (error) {
    res.status(500).json({ message: "Error al actualizar la categoría", error: error.message });
}
};
// Eliminar una categoría (Borrado lógico)
exports.deleteCategory = async (req, res) => {
try {
const [updatedRows] = await Category.update({ activo: false }, {
where: { id: req.params.id }
});

if (updatedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría eliminada correctamente" });
} catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría", error: error.message });
}
};