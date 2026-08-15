// Importa el framework Express para crear la API.
const express = require("express");

// Importa las rutas relacionadas con autenticación.
const authRoutes = require("./routes/authRoutes");

// Crea una instancia de la aplicación Express.
const app = express();

// Define el puerto donde funcionará la API.
const PORT = 3000;

// Permite que Express pueda recibir información
// enviada en formato JSON.
app.use(express.json());

// Ruta principal para comprobar que la API funciona.
app.get("/", (req, res) => {

    // Envía una respuesta en formato JSON.
    res.json({
        mensaje: "API de Dushi Ice Cream funcionando correctamente"
    });

});

// Conecta las rutas de autenticación.
// Todas las rutas de auth comenzarán con /api/auth.
app.use("/api/auth", authRoutes);

// Inicia el servidor en el puerto definido.
app.listen(PORT, () => {

    // Muestra en la terminal la dirección de la API.
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );

});
