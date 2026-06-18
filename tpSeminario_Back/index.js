//////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js"; // Traemos las variables de entorno
import cors from "cors"; // Importamos el modulo CORS
import { loggerURL} from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";



//////////
// Config
const PORT = environments.port;
const app = express();



////////////////
// Middlewares
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes

// Middleware "logger" de aplicacion para analizar las solicitudes por consola
app.use(loggerURL);

// Middleware para parsear en las solicitudes POST y PUT
app.use(express.json());



///////////////
// Endpoints
app.use("/api/products", productRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});