const express = require('express');
const cors = require('cors');
const path = require('path');
const rutas = require('./rutas/rutas');

const app = express();
const port = process.env.PORT || 3000; // Usa variables de entorno si existen

// Middleware
app.use(cors());
app.use(express.json()); // Reemplaza body-parser
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', rutas);

// Manejo de 404 (Ruta no encontrada)
app.use((req, res) => {
    res.status(404).json({ mensaje: "La ruta solicitada no existe" });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});