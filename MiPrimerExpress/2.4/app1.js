const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido al servidor principal</h1><p>Prueba las rutas /estados, /pares, etc.</p>');
});
// Middleware global para todas las rutas
app.use((req, res, next) => {
  console.log("SE HA REALIZADO UNA SOLICITUD");
  next(); // Es crucial llamar a next() para pasar la solicitud a la siguiente etapa.
});

// PRIMERA FUNCION: Devuelve un arreglo de 5 estados de la república
app.get('/estados', (req, res) => {
  const estados = [
    "Jalisco",
    "Nuevo León",
    "Yucatán",
    "Sonora",
    "Oaxaca"
  ];
  res.status(200).json(estados);
});

// SEGUNDA FUNCION: Devuelve un arreglo de los primeros 10 números pares
app.get('/pares', (req, res) => {
  const pares = [];
  for (let i = 1; i <= 10; i++) {
    pares.push(i * 2);
  }
  res.status(200).json(pares);
});

// TERCERA FUNCION: Devuelve un booleano si dos números son iguales
app.get('/comparar', (req, res) => {
  // Los parámetros se leen de la query string: /comparar?num1=10&num2=10
  const { num1, num2 } = req.query;

  if (num1 === undefined || num2 === undefined) {
    return res.status(400).json({ error: 'Debes proporcionar num1 y num2 como parámetros.' });
  }
  
  // --- INICIO DE LA MODIFICACIÓN ---
  // Se añade esta validación para asegurar que ambos valores sean numéricos.
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'solo se admiten numeros' });
  }
  // --- FIN DE LA MODIFICACIÓN ---

  // Comparamos los valores (no es necesario parsearlos si la comparación es con ==, pero es buena práctica)
  const sonIguales = (num1 == num2);
  res.status(200).json({ sonIguales });
});

// RUTA DE ERROR: Genera una respuesta de mantenimiento con código 503
app.get('/mantenimiento', (req, res) => {
  res.status(503).json({ message: "SERVIDOR EN MANTENIMIENTO" });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});