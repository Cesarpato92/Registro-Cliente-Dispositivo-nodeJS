const cliente = require('../modelo/modeloCliente');
const dispositivo = require('../modelo/modeloDispositivo');
const reparacion = require('../modelo/modeloReparacion');

// este archivo contiene las funciones para el registro de clientes, dispositivos y reparaciones

exports.registroClienteDispositivoReparacion = (req, res) => {
    // obtenemos los datos del cliente desde el cuerpo de la solicitud
    const { cedula, nombre, email, telefono, marca, tipo_reparacion, tipo_password, password, comentarios_dispositivo, version, fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios_reparacion } = req.body;
    // creamos el cliente en la DB

    try {
        //validamos los datos recibidos
        if (!cedula || !nombre || !email || !telefono || !marca || !version  || !precio_reparacion) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        }
        if (isNaN(cedula) || isNaN(telefono) || isNaN(precio_reparacion)) {
            return res.status(400).json({ mensaje: 'Los campos cedula, telefono y precio deben ser numericos' });
        }
        if (!tipo_reparacion == "Sin contraseña" && !tipo_password == "") {
            return res.status(400).json({ mensaje: 'La contraseña debe ser proporcionada' });
        }

        cliente.encontrarPorCedula(cedula, (error, resultados) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al buscar el cliente: ' + error });
            }
            if (resultados.length > 0) {
                // El cliente ya existe, actualizamos su informacion
                cliente.actualizarCliente(cedula, nombre, email, telefono, (error, resultados) => {
                    if (error) {
                        return res.status(500).json({ mensaje: 'Error al actualizar el cliente: ' + error });
                    }
                    res.status(200).json({ mensaje: 'Cliente actualizado correctamente' });
                });
            }
            else {
                // El cliente no existe, lo creamos
                cliente.crear(cedula, nombre, email, telefono, (error, resultados) => {
                    if (error) {
                        return res.status(500).json({ mensaje: 'Error al crear el cliente: ' + error });
                    }
                    res.status(201).json({ mensaje: 'Cliente creado correctamente' });
                });
            }

        });

    // creamos el dispositivo en la DB
        dispositivo.crear(marca, tipo_reparacion, tipo_password, password, comentarios_dispositivo, cedula, version, (error, resultados) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al crear el dispositivo: ' + error });
            }
            const id_dispositivo = resultados.insertId; 
            return id_dispositivo;
        });
    // creamos la reparacion en la DB
        reparacion.crear(id_dispositivo, fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios_reparacion, (error, resultados) => {
            if (error) {
                return res.status(500).json({ mensaje: 'Error al crear la reparacion: ' + error });
            }
            res.status(201).json({ mensaje: 'Reparacion creada correctamente' });
        });
    } catch (error) {
        return res.status(500).json({ 
            mensaje: 'Error del servidor: ',
            error: error });
    }
};
