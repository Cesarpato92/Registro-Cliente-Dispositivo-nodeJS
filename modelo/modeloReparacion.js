const conexion = require('../config/config-db');

// Este archivo contiene las funciones que interactuan con la tabla reparacion de la DB
const reparacion = {
    /**
     * Crear una nueva reparacion en la DB
     * @param {string} fecha_ingreso - Fecha de la reparacion
     * @param {string} estado - Estado de la reparacion
     * @param {string} costo_repuesto - Costo de repuestos de la reparacion
     * @param {string} precio_reparacion - Precio total de la reparacion
     * @param {string} comentarios - Comentarios adicionales sobre la reparacion
     * @param {string} id_dispositivo - ID del dispositivo asociado a la reparacion
     * @param {function} callback - Funcion callback para manejar el resultado de la consulta
     */
    crear: (id_dispositivo, fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios, callback) => {
        const sql = 'INSERT INTO reparacion (fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios, id_dispositivo) VALUES (?, ?, ?, ?, ?, ?)';
        conexion.query(sql, [id_dispositivo, fecha_ingreso, estado, costo_repuesto, precio_reparacion, comentarios], callback);
    }
};

// exportamos el objeto reparacion para usarlo en otros archivos
module.exports = reparacion;