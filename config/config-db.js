const mysql = require('mysql2');

// configuracion de la conexion
// utilizmaos el paquete mysql2 para establecer la conexion

const conexion = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'pcelmedic'
});

// establecemos la conexion a la DB

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: '+error);
        return;
    }
    console.log('Conexion correcta a la base de datos');
});

// exportamos la conexion para usarl;a en otros archivos
module.exports = conexion;