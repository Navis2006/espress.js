// controllers/auth.controller.js
const users = require('./users.controller.js'); // Importamos para simular acceso a la bd de usuarios

// Simulación de una base de datos en memoria para usuarios
let userDb = [
    { id: 1, profile_id: 1, nombres: "Admin", apellidos: "User", nick: "admin", correo: "admin@example.com", contraseña: "admin123", activo: true },
    { id: 2, profile_id: 2, nombres: "Juan", apellidos: "Perez", nick: "JuanP", correo: "juan@example.com", contraseña: "user123", activo: true }
];
let nextUserId = 3;

// POST /auth/login
exports.login = (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ message: "Correo y contraseña son requeridos" });
        }

        const user = userDb.find(u => u.correo === correo);

        if (!user || user.contraseña !== contraseña) { // Comparación directa (insegura, solo para el ejemplo)
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        if (!user.activo) {
            return res.status(403).json({ message: "El usuario está inactivo" });
        }

        // En una aplicación real, aquí se generaría un Token (JWT)
        res.status(200).json({
            message: "Login exitoso",
            token: "este_es_un_token_de_simulacion_jwt",
            user: {
                id: user.id,
                nick: user.nick,
                correo: user.correo,
                profile_id: user.profile_id
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// POST /auth/registro
exports.register = (req, res) => {
    try {
        const { nombres, apellidos, nick, correo, contraseña } = req.body;

        if (!nombres || !nick || !correo || !contraseña) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const existingUser = userDb.find(u => u.correo === correo || u.nick === nick);
        if (existingUser) {
            return res.status(409).json({ message: "El correo o nick ya están en uso" });
        }

        const newUser = {
            id: nextUserId++,
            profile_id: 2, // 2 = Contribuidor por defecto
            nombres,
            apellidos,
            nick,
            correo,
            contraseña, // En un caso real, aquí se "hashearía" la contraseña
            activo: true,
            UserAlta: nick,
            FechaAlta: new Date().toISOString()
        };

        userDb.push(newUser);

        // No devolver la contraseña en la respuesta
        const { contraseña: _, ...userResponse } = newUser;

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            data: userResponse
        });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};