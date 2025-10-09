// index.js

// 1. Importar Express
const express = require('express');

// 2. Crear una instancia de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middleware
// Este middleware es esencial para que tu API pueda recibir y entender cuerpos de solicitud en formato JSON.
app.use(express.json());

// 4. Importar las rutas
const newsRoutes = require('./routes/news.routes');
const categoriesRoutes = require('./routes/categories.routes');
const statesRoutes = require('./routes/states.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// 5. Usar las rutas en la aplicación
// Se define una ruta base para cada conjunto de endpoints.
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/states', statesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Ruta de bienvenida para la raíz de la API
app.get('/api', (req, res) => {
  res.status(200).json({ message: '¡Bienvenido a la API de Noticias de México!' });
});

// 6. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});