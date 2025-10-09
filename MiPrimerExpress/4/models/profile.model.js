// models/profile.model.js

/**
 * Representa el perfil de un usuario (Ej: Administrador, Contribuidor).
 */
class Profile {
    /**
     * @param {number} id - El ID único del perfil.
     * @param {string} nombre - El nombre del perfil.
     */
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

module.exports = Profile;