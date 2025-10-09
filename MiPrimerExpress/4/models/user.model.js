// models/user.model.js

/**
 * Representa a un usuario en el sistema.
 */
class User {
    constructor({
        id,
        profile_id,
        nombres,
        apellidos,
        nick,
        correo,
        contraseña,
        activo = true,
        UserAlta,
        FechaAlta,
        UserMod,
        FechaMod,
        UserBaja,
        FechaBaja
    }) {
        this.id = id;
        this.profile_id = profile_id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.nick = nick;
        this.correo = correo;
        this.contraseña = contraseña; // Nota: En una app real, esto debería ser un hash.
        this.activo = activo;
        this.UserAlta = UserAlta;
        this.FechaAlta = FechaAlta || new Date().toISOString();
        this.UserMod = UserMod;
        this.FechaMod = FechaMod;
        this.UserBaja = UserBaja;
        this.FechaBaja = FechaBaja;
    }
}

module.exports = User;