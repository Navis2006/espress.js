// models/category.model.js

/**
 * Representa una categoría para las noticias.
 */
class Category {
    constructor({
        id,
        nombre,
        descripcion,
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
        this.descripcion = descripcion;
        this.activo = activo;
        this.UserAlta = UserAlta;
        this.FechaAlta = FechaAlta || new Date().toISOString();
        this.UserMod = UserMod;
        this.FechaMod = FechaMod;
        this.UserBaja = UserBaja;
        this.FechaBaja = FechaBaja;
    }
}

module.exports = Category;