# IFTS 16 2026 c1 Seminario

# TP Seminario

## 1. Arrancando un servidor minimo
### 1.1 Configuracion inicial del proyecto
```sh
# Comprobamos version de Node.js y NPM
node -v # v20.5.0

npm -v # 9.8.0

# Creamos las carpetas del front y el back de nuestro proyecto
mkdir tpSeminario_Back tpSeminario_Front

# Inicializamos el proyecto back
cd tpSeminario_Back
npm init -y
```

---


### 1.2 Instalacion de dependencias y setup basico con sintaxis [`ESM`](https://nodejs.org/api/esm.html)
```sh
# Instalamos las dependencias necesarias, que se guardaran en node_modules
npm install express ejs mysql2 nodemon dotenv
```

#### Que estamos instalando?

- `express`: Framework web
- `EJS`: Motor de plantillas
- `mysql2`: Cliente mysql para Node.js
- `nodemon`: Herramienta que reinicia automaticamente la aplicacion Node.js cuando detecta cambios en los archivos durante el desarrollo
- `dotenv`: Modulo que carga variables de entorno desde un archivo `.env` al entorno de ejecucion de Node.js


---


### 1.3 Declaramos la sintaxis `ESM` y el script de arranque en el `package.json`

```json
"type": "module",
  "scripts": {
    "dev": "nodemon index.js"
  },
```

---


### 1.4 Creamos el archivo principal `index.js` tal como lo indica el `package.json`
```js
import express from "express";
const app = express();

// Endpoint de prueba
app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});
```

Finalmente ejecutamos nuestro servidor con el nuevo script `"dev"`
```sh
npm run dev
```

---


# 2. Conectando nuestra app a una Base de Datos
### 2.1 Instalar mysql y phpmyadmin
- En Linux, seguir los tutoriales de instalacion de nuestra version de Linux, en este caso `Linux Mint 21.3`
- Para Windows, usar [xampp](https://www.apachefriends.org/es/index.html)


---


### 2.2 Crear archivos `.gitignore` y `.env` en la raiz del proyecto
```sh
# Creamos ambos en un solo comando
touch .gitignore .env
```
- `.gitignore` nos permite no enviar a git nuestros paquetes de npm y nuestras variables de entorno
- `.env` sirve para almacenar localmente variables sensibles como el usuario y password de la conexion a la BBDD, el puerto, etc

#### Dentro de `.gitignore` escribimos
```
node_modules
.env
```


#### Creamos nuestras variables de entorno en `.env`
Previamente instalamos el paquete dotenv, que sirve para cargar las variables de entorno desde un archivo `.env`, lo que es especialmente util para manejar configuraciones de desarrollo, produccion y otras configuraciones especificas

```
PORT=3000
DB_HOST="localhost"
DB_NAME="nombreDB"
DB_USER="user"
DB_PASSWORD="pass"
```


---


### 2.3 Crear estructura de directorios de nuestro proyecto para almacenar la config y la conexion a la BBDD
- Creamos las carpetas y el archivo `src/api/config/environments.js`

- `environments.js`
```js
// Importamos el modulo dotenv para importar las variables de entorno
import dotenv from "dotenv";

dotenv.config(); // Cargamos las variables de entorno

// Las exportamos desde este modulo
export default {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}
```

- Creamos las carpetas y el archivo `src/api/database/db.js`
```js
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
```

---


### 2.4 Creamos un endpoint minimo para probar la conexion a la BBDD

#### Creamos el endpoint GET all products en index.js
```js
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
```

#### Listo! Ya podemos visualizar en el navegador o en [Insomnia](https://insomnia.rest/)


---


### 2.5 Creamos un front minimo para poder consumir nuestro primer endpoint basico -> tpIntegrador_Front


---


### 2.6 Instalamos CORS y middlewares para que nuestro front pueda consumir esa informacion