function validarFormulario(cedula, nombre, email, telefono, marca, version, tipo_password, password, precio_reparacion, comentarios_dispositivo) {


    if (!cedula || !nombre || !email || !telefono || !marca || !version || !precio_reparacion) {
        return ('Por favor, complete todos los campos obligatorios.');

    }
    if (isNaN(cedula) || isNaN(telefono) || isNaN(precio_reparacion)) {
        return ('Los campos cédula, teléfono y precio deben ser numéricos.');
    }
    if (tipo_password !== "Sin contraseña" && !password) {
        return ('Por favor, proporcione la contraseña del dispositivo.');
    }
    return null;
}
function limpiarCampos() {
    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('version').value = '';
    document.getElementById('tipo_reparacion').value = '';
    document.getElementById('tipo_password').value = '';
    document.getElementById('password').value = '';
    document.getElementById('precio_reparacion').value = '';
    document.getElementById('comentarios').value = '';
    //document.getElementById('registroMensaje').textContent = '';

}

// manejador del evento de envio del formulario
document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // prevenir el envio del formulario

    //obtenemos los valores de los imputs
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const marca = document.getElementById('marca').value;
    const version = document.getElementById('version').value;
    const tipo_reparacion = document.getElementById('tipo_reparacion').value;
    const tipo_password = document.getElementById('tipo_password').value;
    const password = document.getElementById('password').value;
    const precio_reparacion = document.getElementById('precio_reparacion').value;
    const comentarios_dispositivo = document.getElementById('comentarios').value;
    const mensaje = document.getElementById('registroMensaje');
    const precio_repuesto = 0; // Valor predeterminado
    const fecha_ingreso = new Date().toISOString().split('T')[0];
    const estado = "En proceso"; // Valor predeterminado
    const comentarios_tecnico = ""; // Valor predeterminado


    // Validar los datos del formulario
    const errorMensaje = validarFormulario(cedula, nombre, email, telefono, marca, version, tipo_password, password, precio_reparacion, comentarios_dispositivo);

    if (errorMensaje) {
        mensaje.style.color = 'red';
        mensaje.textContent = errorMensaje;
        return;
    }
    console.log("Datos validados correctamente", tipo_password);

    try {
        // Enviar los datos al servidor mediante fetch API
        fetch('/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cedula,
                nombre,
                email,
                telefono,
                marca,
                version,
                tipo_reparacion,
                tipo_password,
                password,
                comentarios_dispositivo,
                fecha_ingreso,
                estado,
                precio_repuesto,
                precio_reparacion,
                comentarios_tecnico
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje.includes('correctamente')) {
                    mensaje.style.color = 'green';
                    limpiarCampos();
                } else {
                    mensaje.style.color = 'red';
                }
                mensaje.textContent = data.mensaje;
            })
            .catch(error => {
                mensaje.style.color = 'red';
                mensaje.textContent = 'Error al conectar con el servidor: ' + error;
            });
    } catch (error) {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Error inesperado: ' + error;
    }
});