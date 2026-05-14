// Importamos el modulo mysql2 en modo promesas para hacer peticiones asnyc a la BBDD
import mysql2 from "mysql2/promise";

// Importamos la informacion de la conexion a la BBDD de las variables de entorno
import environments from "../config/environments.js";

// Traemos la informacion del .env que importamos de environments.js
const { database } = environments;

// Creamos un pool de conexiones a la BBDD
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exportamos el pool de conexiones para que pueda ser utilizado en otros archivos
export default connection;
