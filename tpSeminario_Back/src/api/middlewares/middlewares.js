/*===================
    Middlewares
====================*/

// Middleware de aplicacion loggerURL
const loggerURL = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pasa al siguiente middleware
}


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

export {
    loggerURL,
    validateId,
    validateProduct
}