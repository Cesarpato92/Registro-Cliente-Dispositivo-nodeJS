const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const rutas = require('./rutas/rutas');

// creamos la aplicacion de express
const app = express();
const port = 3000;

// configuramos el middleware
app.use(cors()); // habilitamos CORS
app.use(bodyParser.json()); // para parsear solicitudes con JSON
app.use(express.static(path.join(__dirname, 'public'))); // para servir archivos estaticos

//RUTAS

app.use('/api', rutas);

// iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});