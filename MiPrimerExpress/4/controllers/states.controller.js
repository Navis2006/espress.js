// controllers/states.controller.js

// Simulación de base de datos
let states = [
    { id: 1, nombre: "Yucatán", abreviacion: "YUC", activo: true },
    { id: 2, nombre: "Ciudad de México", abreviacion: "CDMX", activo: true }
];

// GET /states
exports.getAllStates = (req, res) => {
    res.status(200).json({
        message: "Estados obtenidos correctamente",
        data: states.filter(s => s.activo)
    });
};

// GET /states/:id
exports.getStateById = (req, res) => {
    const stateId = parseInt(req.params.id);
    const state = states.find(s => s.id === stateId && s.activo);
    if (!state) {
        return res.status(404).json({ message: "Estado no encontrado" });
    }
    res.status(200).json({
        message: "Estado encontrado",
        data: state
    });
};

// POST /states
exports.createState = (req, res) => {
    const { nombre, abreviacion } = req.body;
    if (!nombre || !abreviacion) {
        return res.status(400).json({ message: "Nombre y abreviación son requeridos" });
    }
    const newState = {
        id: states.length + 1,
        nombre,
        abreviacion,
        activo: true
    };
    states.push(newState);
    res.status(201).json({
        message: "Estado creado exitosamente",
        data: newState
    });
};

// PUT /states/:id
exports.updateState = (req, res) => {
    const stateId = parseInt(req.params.id);
    const stateIndex = states.findIndex(s => s.id === stateId);
    if (stateIndex === -1) {
        return res.status(404).json({ message: "Estado no encontrado" });
    }
    const updatedState = { ...states[stateIndex], ...req.body };
    states[stateIndex] = updatedState;
    res.status(200).json({
        message: "Estado actualizado correctamente",
        data: updatedState
    });
};

// DELETE /states/:id
exports.deleteState = (req, res) => {
    const stateId = parseInt(req.params.id);
    const stateIndex = states.findIndex(s => s.id === stateId);
    if (stateIndex === -1) {
        return res.status(404).json({ message: "Estado no encontrado" });
    }
    states[stateIndex].activo = false;
    res.status(200).json({ message: "Estado eliminado correctamente" });
};