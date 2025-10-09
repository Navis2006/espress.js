// controllers/users.controller.js

// Simulación de base de datos de usuarios
let users = [
    { id: 1, profile_id: 1, nombres: "Admin", apellidos: "User", nick: "admin", correo: "admin@example.com", contraseña: "hashedpassword1", activo: true },
    { id: 2, profile_id: 2, nombres: "Juan", apellidos: "Perez", nick: "JuanP", correo: "juan@example.com", contraseña: "hashedpassword2", activo: true }
];

// NOTA: En una aplicación real, NUNCA devolveríamos la contraseña.
// Estos endpoints serían solo para administradores.

// GET /users
exports.getAllUsers = (req, res) => {
    // Excluimos las contraseñas para la respuesta
    const usersResponse = users.map(u => {
        const { contraseña, ...user } = u;
        return user;
    });
    res.status(200).json({ data: usersResponse });
};

// GET /users/:id
exports.getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { contraseña, ...userResponse } = user;
    res.status(200).json({ data: userResponse });
};

// POST /users (Normalmente la creación se haría via /auth/registro)
exports.createUser = (req, res) => {
    // Esta función podría ser usada por un administrador para crear usuarios
    const { profile_id, nombres, apellidos, nick, correo, contraseña } = req.body;
    const newUser = {
        id: users.length + 1,
        profile_id: profile_id || 2, // Perfil 2: Contribuidor
        nombres,
        apellidos,
        nick,
        correo,
        contraseña: `hashed_${contraseña}`, // Simulación de hash
        activo: true
    };
    users.push(newUser);
    const { contraseña: _, ...userResponse } = newUser;
    res.status(201).json({ message: "Usuario creado", data: userResponse });
};

// PUT /users/:id
exports.updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // No permitir actualizar contraseña desde este endpoint
    const { contraseña, ...updateData } = req.body;
    users[userIndex] = { ...users[userIndex], ...updateData };
    
    const { contraseña: _, ...userResponse } = users[userIndex];
    res.status(200).json({ message: "Usuario actualizado", data: userResponse });
};

// DELETE /users/:id
exports.deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    users[userIndex].activo = false;
    res.status(200).json({ message: "Usuario desactivado" });
};