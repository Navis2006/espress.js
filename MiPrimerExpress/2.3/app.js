const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manipular la solicitud
app.use((req, res, next) => {
    // Realiza operaciones en la solicitud, por ejemplo, extraer datos
    console.log('Solicitud recibida por:', req.headers['user-agent']);
    next(); // Pasa la solicitud al siguiente middleware/ruta
});

// Middleware para manipular la respuesta
app.use((req, res, next) => {
    // Establece encabezados de respuesta
    res.setHeader('Content-Type', 'text/plain');
    next(); // Pasa la respuesta al siguiente middleware/ruta
});

// Ruta final que envía la respuesta
app.get('/', (req, res) => {
    // Envía datos de respuesta al cliente
    res.send('¡Hola, soy una respuesta que fui procesada!');
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});
