// models/state.model.js

/**
 * Representa un estado de la república mexicana.
 */
class State {
    constructor({
        id,
        nombre,
        abreviacion,
        activo = true,
        UserAlta,
        FechaAlta,
        UserMod,
        FechaMod,
        UserBaja,
        FechaBaja
    }) {
        this.id = id;
        this.nombre = nombre;
        this.abreviacion = abreviacion;
        this.activo = activo;
        this.UserAlta = UserAlta;
        this.FechaAlta = FechaAlta || new Date().toISOString();
        this.UserMod = UserMod;
        this.FechaMod = FechaMod;
        this.UserBaja = UserBaja;
        this.FechaBaja = FechaBaja;
    }
}

module.exports = State;