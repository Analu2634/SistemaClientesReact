// Importa el modelo Usuario para crear nuevos usuarios.
const Usuario = require("../models/Usuario");

// Lista temporal donde se almacenarán los usuarios registrados.
const usuarios = [];

// Función encargada de registrar un usuario.
function registrarUsuario(req, res) {

    // Obtiene usuario y contraseña enviados en la petición.
    const { usuario, contrasena } = req.body;

    // Verifica que ambos campos hayan sido enviados.
    if (!usuario || !contrasena) {

        // Devuelve un error indicando que faltan datos.
        return res.status(400).json({
            mensaje: "El usuario y la contraseña son obligatorios."
        });
    }

    // Verifica si el usuario ya se encuentra registrado.
    const usuarioExistente = usuarios.find(
        (item) => item.usuario === usuario
    );

    // Si el usuario existe, devuelve un mensaje de error.
    if (usuarioExistente) {

        return res.status(409).json({
            mensaje: "El usuario ya se encuentra registrado."
        });
    }

    // Crea un nuevo objeto Usuario.
    const nuevoUsuario = new Usuario(
        usuario,
        contrasena
    );

    // Agrega el usuario a la lista.
    usuarios.push(nuevoUsuario);

    // Devuelve una respuesta satisfactoria.
    res.status(201).json({
        mensaje: "Usuario registrado correctamente.",
        usuario: usuario
    });
}

// Función encargada de validar el inicio de sesión.
function iniciarSesion(req, res) {

    // Obtiene el usuario y la contraseña enviados por el cliente.
    const { usuario, contrasena } = req.body;

    // Verifica que los datos hayan sido enviados.
    if (!usuario || !contrasena) {

        return res.status(400).json({
            mensaje: "El usuario y la contraseña son obligatorios."
        });
    }

    // Busca un usuario que coincida con las credenciales recibidas.
    const usuarioEncontrado = usuarios.find(
        (item) =>
            item.usuario === usuario &&
            item.contrasena === contrasena
    );

    // Si no encuentra coincidencia, devuelve error de autenticación.
    if (!usuarioEncontrado) {

        return res.status(401).json({
            mensaje: "Error en la autenticación."
        });
    }

    // Si las credenciales son correctas, confirma la autenticación.
    res.status(200).json({
        mensaje: "Autenticación satisfactoria.",
        usuario: usuario
    });
}

// Exporta las funciones para utilizarlas desde las rutas.
module.exports = {
    registrarUsuario,
    iniciarSesion
};

