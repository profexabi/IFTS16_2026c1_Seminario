//////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js"; // Traemos las variables de entorno
import cors from "cors"; // Importamos el modulo CORS
import { loggerURL} from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import session from "express-session";



//////////
// Config
const { port, session_key } = environments;
const PORT = port;
const app = express();



////////////////
// Middlewares
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes

// Middleware "logger" de aplicacion para analizar las solicitudes por consola
app.use(loggerURL);

// Middleware para parsear en las solicitudes POST y PUT
app.use(express.json());

// Middleware para trabajar con archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

// Middleware de sesion
app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

// Middleware para parsear los datos del <form>
app.use(express.urlencoded({
    extended: true
}))






///////////////
// Endpoints
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", authRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});