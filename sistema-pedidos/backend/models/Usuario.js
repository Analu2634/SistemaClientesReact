// Clase que representa a un usuario del sistema.
class Usuario {

    // Constructor que recibe el usuario y la contraseña.
    constructor(usuario, contrasena) {

        // Guarda el nombre de usuario.
        this.usuario = usuario;

        // Guarda la contraseña.
        this.contrasena = contrasena;
    }
}

// Exporta la clase para poder utilizarla desde otros archivos.
module.exports = Usuario;
