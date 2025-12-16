const cliente = require('../modelo/modeloCliente');
const dispositivo = require('../modelo/modeloDispositivo');
const reparacion = require('../modelo/modeloReparacion');

/**
 * Registrar cliente, dispositivo y reparacion
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
exports.registroClienteDispositivoReparacion = (req, res) => {
    // obtenemos los datos del cliente desde el cuerpo de la solicitud
    const { cedula, nombre, email, telefono, marca, tipo_reparacion, tipo_password, password, comentarios_dispositivo, version, fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios_reparacion } = req.body;

    //validamos los datos recibidos

    if (!cedula || !nombre || !email || !telefono || !marca || !version || !precio_reparacion) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }
    if (isNaN(cedula) || isNaN(telefono) || isNaN(precio_reparacion)) {
        return res.status(400).json({ mensaje: 'Los campos cedula, telefono y precio deben ser numericos' });
    }
    if (tipo_password !== "Sin contraseña" && !password) {
        return res.status(400).json({ mensaje: 'La contraseña debe ser proporcionada' });
    }

    // Primero, buscamos si el cliente existe
    cliente.encontrarPorCedula(cedula, (error, resultadosCliente) => {
        if (error) {
            return res.status(500).json({ mensaje: 'Error al buscar el cliente: ' + error });
        }

        // Función para manejar la creación del cliente
        const manejarCliente = (callback) => {
            if (resultadosCliente.length > 0) {
                // El cliente ya existe, actualizamos su informacion
                cliente.actualizarCliente(cedula, nombre, email, telefono, (error) => {
                    if (error) {
                        return res.status(500).json({ mensaje: 'Error al actualizar el cliente: ' + error });
                    }
                    callback();
                });
            } else {
                // El cliente no existe, lo creamos
                cliente.crear(cedula, nombre, email, telefono, (error) => {
                    if (error) {
                        return res.status(500).json({ mensaje: 'Error al crear el cliente: ' + error });
                    }
                    callback();
                });
            }
        };

        // Ejecutamos la secuencia de operaciones
        manejarCliente(() => {
            // Después de manejar el cliente, creamos el dispositivo
            dispositivo.crear(marca, tipo_reparacion, tipo_password, password, comentarios_dispositivo, cedula, version, (error, resultadosDispositivo) => {
                if (error) {
                    console.error("Error al crear dispositivo:", error);
                    return res.status(500).json({ mensaje: 'Error al crear el dispositivo: ' + error.sqlMessage || error });
                }

                // obtenemos y guardamos el id_dispositivo
                const id_dispositivo = resultadosDispositivo.insertId;
                console.log("Dispositivo creado. ID:", id_dispositivo);

                // creamos la reparación con el id_dispositivo
                // Nota: El orden de argumentos debe coincidir con modeloReparacion.js: 
                // (fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios, id_dispositivo, callback)
                reparacion.crear(fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios_reparacion, id_dispositivo, (error) => {
                    if (error) {
                        console.error("Error al crear reparación:", error);
                        return res.status(500).json({ mensaje: 'Error al crear la reparacion: ' + error.sqlMessage || error });
                    }
                    console.log("Reparación creada exitosamente");
                    res.status(201).json({
                        mensaje: 'Registro completo creado correctamente',
                        id_dispositivo: id_dispositivo
                    });
                });
            });
        });
    });
};