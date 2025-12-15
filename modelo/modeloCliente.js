// importamos la configuracion de la conexion de la DB
const conexion = require('../config/config-db');

// Este archivo contiene las funciones que interactuan con la tabla cliente de la DB

const cliente = {
    /**
     * Crear un nuevo cliente en la DB
     * @param {string} cedula - Cedula del cliente
     * @param {string} nombre - Nombre del cliente
     * @param {string} email - Email del cliente
     * @param {string} telefono - Telefono del cliente
     */

    crear: (cedula, nombre, email, telefono, callback) => {
        const sql = 'INSERT INTO cliente (cedula, nombre, email, telefono) VALUES (?, ?, ?, ?)';
        conexion.query (sql, [cedula, nombre, email, telefono], callback);
    },

    /**
     * Encontrar un cliente por su cedula
     * @param {string} cedula - Cedula del cliente
     * @param {function} callback - Funcion callback para manejar el resultado de la consulta
     */
    encontrarPorCedula: (cedula, callback) => {
        const sql = 'SELECT * FROM cliente WHERE cedula = ?';
        conexion.query(sql, [cedula], callback);
    }
};

// exportamos el objeto cliente para usarlo en otros archivos
module.exports = cliente;
