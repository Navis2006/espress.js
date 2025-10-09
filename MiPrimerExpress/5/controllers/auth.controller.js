const { User } = require('../models/UserModel');
// Nota: En un proyecto real, usarías una librería como bcrypt para las contraseñas
// const bcrypt = require('bcryptjs');

// POST /auth/login
exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        if (!correo || !contraseña) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos" });
        }

        const user = await User.findOne({ where: { correo: correo } });

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Comparación simple (INSEGURA). En un caso real:
        // const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        // if (!isMatch) { ... }
        if (user.contraseña !== contraseña) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        if (!user.activo) {
            return res.status(403).json({ message: "El usuario está inactivo" });
        }

        // En una app real, aquí se generaría un Token (JWT)
        res.status(200).json({
            message: "Login exitoso",
            token: "este_es_un_token_de_simulacion_jwt",
            user: {
                id: user.id,
                nick: user.nick,
                correo: user.correo,
                perfil_id: user.perfil_id
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// POST /auth/registro
exports.register = async (req, res) => {
    try {
        const { nombres, nick, correo, contraseña } = req.body;

        if (!nombres || !nick || !correo || !contraseña) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        
        // En una app real, la contraseña se "hashearía" aquí antes de guardarla.
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(contraseña, salt);

        const newUser = await User.create({
            ...req.body,
            // contraseña: hashedPassword, // Se guardaría la contraseña hasheada
            perfil_id: 2 // 2 = Contribuidor por defecto
        });
        
        const { contraseña: _, ...userResponse } = newUser.toJSON();

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            data: userResponse
        });

    } catch (error) {
        // Manejar error de unicidad (correo o nick ya existen)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "El correo o nick ya están en uso." });
        }
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};