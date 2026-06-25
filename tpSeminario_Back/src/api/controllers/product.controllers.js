/*=======================
    Controladores
=======================*/

import ProductModels from "../models/product.models.js";

/////////////////////
// GET all products
export const getAllProducts = async (req, res) => {
    try {
        
        const [rows] = await ProductModels.selectAllProducts();

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
}



/////////////////////
// GET product by id
export const getProductById = async (req, res) => {

    // Optimizacion 1: Incorporamos manejo de errores con try catch en el endpoint
    try {
        // Optimizacion 2: Ya se encarga de proveer y validar el id el middleare validateId

    
        // Aca incorporamos el id que el middleware agrego a la request
        const [rows] = await ProductModels.selectProductsById(req.id);


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

}





/////////////////////
// CREATE new product
export const createProduct = async (req, res) => {

    // Optimizacion 1: Incorporamos manejo de errores con try...catch
    try {
        // Optimizacion 2: Middleware validateProduct ya se encarga de validar los datos enviados
    
        let { category, image, name, price } = req.body;
        console.log(req.body)
    
        
        // Optimizacion 4: Devolvemos el id asignado al nuevo producto
        const [rows] = await ProductModels.insertNewProduct(name, image, category, price);
    
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
}



/////////////////////
// MODIFY product
export const modifyProduct = async(req, res) => {

    // Optimizacion 1: Incorporando manejo de errores
    try {
        const { id, name, image, price, category } = req.body;

        // Optimizacion 2: Validamos que recibamos los datos necesarios
        if (!id || !name || !image || !price || !category) {
            return res.status(400).json({
                message: "Todos los campos son requeridos (name, image, price y category)"
            });
        }
    
    
        await ProductModels.updateProduct(name, image, price, category, id);
    
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
}



/////////////////////
// DELETE product
export const removeProduct = async (req, res) => {
    // Optimizacion 1: manejo de errores con try catch
    try {
        // Optimizacion 3: Prescindimos de const { id } = req.params; gracias a validateId
    
        // Optimizacion 4: Extraemos el resultado en [result]
        const [result] = await ProductModels.deleteProduct(req.id);

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
}