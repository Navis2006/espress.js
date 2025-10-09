const { State } = require('../models/StateModel');

// GET /states
exports.getAllStates = async (req, res) => {
    try {
        const states = await State.findAll({ where: { activo: true } });
        res.status(200).json({ data: states });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener estados", error: error.message });
    }
};

// GET /states/:id
exports.getStateById = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id);
        if (!state || !state.activo) {
            return res.status(404).json({ message: "Estado no encontrado" });
        }
        res.status(200).json({ data: state });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el estado", error: error.message });
    }
};

// POST /states
exports.createState = async (req, res) => {
    try {
        const newState = await State.create(req.body);
        res.status(201).json({
            message: "Estado creado exitosamente",
            data: newState
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el estado", error: error.message });
    }
};

// PUT /states/:id
exports.updateState = async (req, res) => {
    try {
        const [updatedRows] = await State.update(req.body, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Estado no encontrado" });
        }
        
        const updatedState = await State.findByPk(req.params.id);
        res.status(200).json({
            message: "Estado actualizado correctamente",
            data: updatedState
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado", error: error.message });
    }
};

// DELETE /states/:id
exports.deleteState = async (req, res) => {
    try {
        const [updatedRows] = await State.update({ activo: false }, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Estado no encontrado" });
        }

        res.status(200).json({ message: "Estado eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el estado", error: error.message });
    }
};