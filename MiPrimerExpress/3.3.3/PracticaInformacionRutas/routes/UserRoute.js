const express = require('express');
const api = express.Router();

// Array inicial de usuarios
let usuarios = [
    { id: 1, nombre: "Math Jhon", edad: 25 },
    { id: 2, nombre: "Anna Smith", edad: 30 },
    { id: 3, nombre: "Peter Jones", edad: 22 },
    { id: 4, nombre: "Mary Garcia", edad: 28 },
    { id: 5, nombre: "David Miller", edad: 35 }
];

/**
 * @route   GET /api/usuarios
 * @desc    Obtener todos los usuarios. Permite filtrar por 'nombre' y 'edad'.
 * @access  Public
 * @example /api/usuarios?nombre=Jhon
 * @example /api/usuarios?edad=30
 */
api.get('/usuarios', (req, res) => {
    const { nombre, edad } = req.query;
    let resultado = [...usuarios];

    // Filtrar por nombre si el query param existe
    if (nombre) {
        resultado = resultado.filter(usuario =>
            usuario.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    // Filtrar por edad si el query param existe
    if (edad) {
        resultado = resultado.filter(usuario => usuario.edad == edad);
    }

    res.status(200).json(resultado);
});

/**
 * @route   GET /api/usuarios/:id
 * @desc    Obtener un usuario por su ID.
 * @access  Public
 */
api.get('/usuarios/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === userId);

    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

/**
 * @route   POST /api/usuarios
 * @desc    Agregar un nuevo usuario al arreglo.
 * @access  Public
 */
api.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;

    // Validación simple del body
    if (!nuevoUsuario.nombre || !nuevoUsuario.edad) {
        return res.status(400).json({ message: 'El nombre y la edad son requeridos.' });
    }
    
    // Generar un nuevo ID (tomando el ID más alto y sumando 1)
    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    const usuarioParaAgregar = {
        id: newId,
        nombre: nuevoUsuario.nombre,
        edad: nuevoUsuario.edad
    };

    usuarios.push(usuarioParaAgregar);
    
    // Devolvemos el código 201 (Created) y el usuario recién creado
    res.status(201).json(usuarioParaAgregar);
});


/**
 * @route   DELETE /api/usuarios/:id
 * @desc    Eliminar un usuario del arreglo por su ID.
 * @access  Public
 */
api.delete('/usuarios/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = usuarios.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Eliminar el usuario del arreglo
        const usuarioEliminado = usuarios.splice(userIndex, 1);
        res.status(200).json({ message: 'Usuario eliminado correctamente', usuario: usuarioEliminado[0] });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
    }
});


module.exports = api;
