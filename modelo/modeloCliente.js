// importamos la configuracion de la conexion de la DB
const conexion = require('../config/config-db');

// Este archivo contiene las funciones que interactuan con la tabla cliente de la DB

const cliente = {
    /**
     * Crear un nuevo cliente en la DB
     * @param {string} cedula - Cedula del cliente
     * @param {string} nombre - Nombre del cliente
     * @param {string} email - Email del cliente
     * @param {string} celular - Celular del cliente
     */

    crear: (cedula, nombre, email, celular, callback) => {
        const sql = 'INSERT INTO cliente (cedula, nombre, email, celular) VALUES (?, ?, ?, ?)';
        conexion.query(sql, [cedula, nombre, email, celular], callback);
    },

    /**
     * Encontrar un cliente por su cedula
     * @param {string} cedula - Cedula del cliente
     * @param {function} callback - Funcion callback para manejar el resultado de la consulta
     */
    encontrarPorCedula: (cedula, callback) => {
        const sql = 'SELECT * FROM cliente WHERE cedula = ?';
        conexion.query(sql, [cedula], callback);
    },

    actualizarCliente: (cedula, nombre, email, celular, callback) => {
        const sql = 'UPDATE cliente SET nombre = ?, email = ?, celular = ? WHERE cedula = ?';
        conexion.query(sql, [nombre, email, celular, cedula], callback);
    }
};

// exportamos el objeto cliente para usarlo en otros archivos
module.exports = cliente;
