const express = require('express');
const ruta = express.Router();
const registro_controlador = require('../controlador/registroControlador');

// Ruta para el registro de cliente, dispositivo y reparacion
ruta.post('/registro', registro_controlador.registroClienteDispositivoReparacion);

module.exports = ruta;