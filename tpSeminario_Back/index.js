//////////////////
// Importaciones
import express from "express";
import connection from "./src/api/database/db.js"; // Traemos la conexion a la BBDD
import environments from "./src/api/config/environments.js"; // Traemos las variables de entorno
import cors from "cors"; // Importamos el modulo CORS



//////////
// Config
const PORT = environments.port;
const app = express();



////////////////
// Middlewares
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes

// Middleware "logger" de aplicacion para analizar las solicitudes por consola
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pasa al siguiente middleware
});

// Middleware para parsear en las solicitudes POST y PUT
app.use(express.json());



///////////////
// Endpoints
app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

// GET all products
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

// GET product by id
app.get("/api/products/:id", async (req, res) => {

    // Extraemos el valor numerico de la url
    let id = req.params.id;

    let sql = "SELECT * FROM products where products.id = ?";

    const [rows] = await connection.query(sql, [id]);

    res.status(200).json({
        payload: rows
    });
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});