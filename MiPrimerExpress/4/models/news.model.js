// models/news.model.js

/**
 * Representa una noticia.
 */
class News {
    constructor({
        id,
        categoria_id,
        estado_id,
        usuario_id,
        titulo,
        fecha_publicacion,
        description,
        image, // Se almacenaría como un string (base64 o una URL)
        activo = true,
        UserAlta,
        FechaAlta,
        UserMod,
        FechaMod,
        UserBaja,
        FechaBaja
    }) {
        this.id = id;
        this.categoria_id = categoria_id;
        this.estado_id = estado_id;
        this.usuario_id = usuario_id;
        this.titulo = titulo;
        this.fecha_publicacion = fecha_publicacion;
        this.description = description;
        this.image = image;
        this.activo = activo;
        this.UserAlta = UserAlta;
        this.FechaAlta = FechaAlta || new Date().toISOString();
        this.UserMod = UserMod;
        this.FechaMod = FechaMod;
        this.UserBaja = UserBaja;
        this.FechaBaja = FechaBaja;
    }
}

module.exports = News;