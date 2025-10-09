// controllers/categories.controller.js

// Simulación de base de datos
let categories = [
    { id: 1, nombre: "Deportes", descripcion: "Noticias sobre el mundo deportivo", activo: true },
    { id: 2, nombre: "Tecnología", descripcion: "Avances y noticias de tecnología", activo: true }
];

// GET /categories
exports.getAllCategories = (req, res) => {
    res.status(200).json({
        message: "Categorías obtenidas correctamente",
        data: categories.filter(c => c.activo)
    });
};

// GET /categories/:id
exports.getCategoryById = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(c => c.id === categoryId && c.activo);

    if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({
        message: "Categoría encontrada",
        data: category
    });
};

// POST /categories
exports.createCategory = (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ message: "Nombre y descripción son requeridos" });
    }
    const newCategory = {
        id: categories.length + 1,
        nombre,
        descripcion,
        activo: true,
        FechaAlta: new Date().toISOString()
    };
    categories.push(newCategory);
    res.status(201).json({
        message: "Categoría creada exitosamente",
        data: newCategory
    });
};

// PUT /categories/:id
exports.updateCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === categoryId);

    if (categoryIndex === -1) {
        return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const updatedCategory = { ...categories[categoryIndex], ...req.body, FechaMod: new Date().toISOString() };
    categories[categoryIndex] = updatedCategory;
    
    res.status(200).json({
        message: "Categoría actualizada correctamente",
        data: updatedCategory
    });
};

// DELETE /categories/:id
exports.deleteCategory = (req, res) => {
    const categoryId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === categoryId);

    if (categoryIndex === -1) {
        return res.status(404).json({ message: "Categoría no encontrada" });
    }

    categories[categoryIndex].activo = false; // Borrado lógico
    res.status(200).json({ message: "Categoría eliminada correctamente" });
};