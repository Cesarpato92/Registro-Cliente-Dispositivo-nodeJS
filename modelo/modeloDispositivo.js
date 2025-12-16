const db = require('../config/config-db');

// Este archivo contiene las funciones que interactuan con la tabla dispositivo de la DB
const dispositivo = {
    /**
     * Crear un nuevo dispositivo en la DB
     * @param {string} marca - Marca del dispositivo
     * @param {string} tipo_reparacion - Tipo de reparacion del dispositivo
     * @param {string} tipo_password - Tipo de password del dispositivo
     * @param {string} password - Password del dispositivo
     * @param {string} comentarios - Comentarios adicionales sobre el dispositivo
     * @param {string} id_cliente - ID del cliente asociado al dispositivo
     * @param {string} version - Version del dispositivo
     */
    crear: (marca, tipo_reparacion, tipo_password, password, comentarios, id_cliente, version, callback) => {
        const sql = 'INSERT INTO dispositivo (marca, tipo_reparacion, tipo_contraseña, contraseña, comentarios, id_cliente, version) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [marca, tipo_reparacion, tipo_password, password, comentarios, id_cliente, version], callback);
    },
    /**
     * Encontrar un dispositivo por su ID
     * @param {string} id - ID del dispositivo
     * @param {function} callback - Funcion callback para manejar el resultado de la consulta
     */
    encontrarPorId: (id, callback) => {
        const sql = 'SELECT * FROM dispositivo WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

// exportamos el objeto dispositivo para usarlo en otros archivos
module.exports = dispositivo;