// Importa Express para crear las rutas de la API.
const express = require("express");

// Importa las funciones del controlador de autenticación.
const {
    registrarUsuario,
    iniciarSesion
} = require("../controllers/authController");

// Crea el router de autenticación.
const router = express.Router();

// Ruta para registrar nuevos usuarios.
router.post("/registro", registrarUsuario);

// Ruta para iniciar sesión y validar las credenciales.
router.post("/login", iniciarSesion);

// Exporta las rutas para utilizarlas desde app.js.
module.exports = router;
