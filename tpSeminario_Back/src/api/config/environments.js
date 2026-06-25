// Importamos el modulo dotenv para importar las variables de entorno
import dotenv from "dotenv";

dotenv.config(); // Cargamos las variables de entorno

// Las exportamos desde este modulo
export default {
    port: process.env.PORT || 3000,
    session_key: process.env.SESSION_KEY,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}