//////////////////
// Importaciones
import express from "express";
import connection from "./src/api/database/db.js"; // Traemos la conexion a la BBDD
import environments from "./src/api/config/environments.js"; // Traemos las variables de entorno


//////////
// Config
const PORT = environments.port;
const app = express();

///////////////
// Endpoints
app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.get("/api/products", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM products");
        
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.error("Error obteniendo productos", error.message);
    }
});



app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});