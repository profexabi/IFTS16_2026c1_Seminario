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

// Middleware de ruta (al contrario que el de aplicacion, se aplica a ciertas rutas)
const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un entero positivo"
        });
    }

    req.id = id;
    next();
}


// Middleware de ruta validateProduct para validar los campos de un formulario
const categoriasValidas = ["food", "drink"];
const validateProduct = (req, res, next) => {

    // Recogemos los datos del body
    const { name, price, category } = req.body;
    const errores = [];

    if (!name || !price || !category) {
        errores.push("Datos invalidos, asegurate de incluir todas las categorias");
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (!categoriasValidas.includes(category)) {
        errores.push("Categorias invalidas");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos", errores
        });
    }

    next();
}



///////////////
// Endpoints
app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

// GET all products
app.get("/api/products", async (req, res) => {
    try {
        // Optimizacion 1: la consulta pidiendo las columnas necesarias
        const [rows] = await connection.query("SELECT id, name, price, image FROM products");

        // Optimizacion 2: Devolvemos un 404 si no hay productos
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
        
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.error("Error obteniendo productos", error.message);

        // Optimizacion 3: Si fallo la conexion a la BBDD, devolveremos un mensaje de error generico
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
});

// GET product by id
app.get("/api/products/:id", validateId, async (req, res) => {

    // Optimizacion 1: Incorporamos manejo de errores con try catch en el endpoint
    try {
        // Optimizacion 2: Ya se encarga de proveer y validar el id el middleare validateId

        // Optimizacion 3: Pedimos los campos necesarios
        let sql = "SELECT id, name, price, image FROM products where products.id = ?";

        // Aca incorporamos el id que el middleware agrego a la request
        const [rows] = await connection.query(sql, [req.id]);


        // Optimizacion 4: Devolvemos un 404 si no existe ese producto
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${req.id}`, error.message);

        // Optimizacion 4: Devolvemos un codigo 500
        res.status(500).json({
            message: `Error interno al obtener un producto por id`
        });
    }

});


// POST product
app.post("/api/products", validateProduct, async (req, res) => {

    // Optimizacion 1: Incorporamos manejo de errores con try...catch
    try {
        // Optimizacion 2: Middleware validateProduct ya se encarga de validar los datos enviados
    
        let { category, image, name, price } = req.body;
        console.log(req.body)
    
        let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    
        // Optimizacion 4: Devolvemos el id asignado al nuevo producto
        const [rows] = await connection.query(sql, [name, image, category, price]);
    
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId // Devolvemos tambien el nuevo id creado
        });


    } catch (error) {
        console.log(error);

        // Optimizacion 3: Devolvemos una respuesta con codigo de estado 500
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }

});


// PUT product
app.put("/api/products", async(req, res) => {

    // Optimizacion 1: Incorporando manejo de errores
    try {
        const { id, name, image, price, category } = req.body;

        // Optimizacion 2: Validamos que recibamos los datos necesarios
        if (!id || !name || !image || !price || !category) {
            return res.status(400).json({
                message: "Todos los campos son requeridos (name, image, price y category)"
            });
        }
    
        const sql = "UPDATE productss SET name = ?, image = ?, price = ?, category = ? WHERE id = ?";
    
        await connection.query(sql, [name, image, price, category, id]);
    
        return res.status(200).json({
            message: `Producto con id ${id} actualizado correctamente`
        });

    } catch (error) {
        console.log(error);

        // Optimizacion 3: Incorporamos una respuesta 500 al cliente
        res.status(500).json({
            message: "Error interno al actualizar el producto"
        })
    }
});



// DELETE product
app.delete("/api/products/:id", validateId, async (req, res) => {
    // Optimizacion 1: manejo de errores con try catch
    try {
        // Optimizacion 3: Prescindimos de const { id } = req.params; gracias a validateId
    
        // Optimizacion 4: Extraemos el resultado en [result]
        const [result] = await connection.query("DELETE FROM products WHERE id = ?", [req.id]);

        // console.log(result);
    
        // Optimizacion 5: Devolver un codigo 204, la convencion REST es 204 para un No Content
        res.status(204).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });

    } catch (error) {
        console.log(`Error en peticion DELETE:`, error);

        // Optimizacion 2: Devolvemos una respuesta 500 en caso de error en la conexion a la BBDD
        res.status(500).json({
            message: "Error interno del servidor"
        })
    }
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});