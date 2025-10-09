const { User } = require('../models/UserModel');

// GET /users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { activo: true },
            attributes: { exclude: ['contraseña'] } // Excluir la contraseña
        });
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['contraseña'] }
        });
        if (!user || !user.activo) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
};

// POST /users (Función de Admin)
exports.createUser = async (req, res) => {
    try {
        // En una app real, la contraseña se "hashearía" aquí antes de guardarla.
        const newUser = await User.create(req.body);
        const { contraseña, ...userResponse } = newUser.toJSON();
        res.status(201).json({
            message: "Usuario creado exitosamente",
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
    try {
        // No permitir actualizar la contraseña desde este endpoint por seguridad
        delete req.body.contraseña;

        const [updatedRows] = await User.update(req.body, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        const updatedUser = await User.findByPk(req.params.id, {
            attributes: { exclude: ['contraseña'] }
        });
        res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
    try {
        const [updatedRows] = await User.update({ activo: false }, {
            where: { id: req.params.id }
        });
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario desactivado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al desactivar el usuario", error: error.message });
    }
};