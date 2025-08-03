const express = require('express');
const app = express();
const pool = require('./db'); // conexión a PostgreSQL
const PORT = 3000;
const resenasRoutes = require('./routes/resenas');

// Middleware para parsear JSON
app.use(express.json());
app.use('/resenas', resenasRoutes);


// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de MovieFan!');
});

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
