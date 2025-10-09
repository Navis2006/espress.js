const express = require('express');
const user_routes = require('./routes/UserRoute');

const app = express();
const PORT = 3000;

// Middleware para que Express pueda entender y procesar cuerpos de solicitud en formato JSON.
// Esto es crucial para que `req.body` funcione en la ruta POST.
app.use(express.json());

// Se le indica a la aplicación que todas las rutas que empiecen con '/api'
// serán manejadas por el enrutador que importamos de UserRoute.js
app.use('/api', user_routes);

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡El servidor está funcionando! Prueba las rutas de /api/usuarios');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
