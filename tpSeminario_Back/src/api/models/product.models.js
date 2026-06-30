/*=======================
    Modelos productos
=======================*/

import connection from "../database/db.js";

// Seleccionar todos los productos
const selectAllProducts = () => {
    // Optimizacion 1: la consulta pidiendo las columnas necesarias
    const sql = "SELECT id, name, price, image FROM products";
    return connection.query(sql);
}


// Seleccionar producto por id
const selectProductsById = (id) => {
    // Optimizacion 3: Pedimos los campos necesarios
    let sql = "SELECT id, name, price, image FROM products where products.id = ?";

    // Aca incorporamos el id que el middleware agrego a la request
    return connection.query(sql, [id]);
}


// Crear producto
const insertNewProduct = (name, image, category, price) => {
    let sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    
    // Optimizacion 4: Devolvemos el id asignado al nuevo producto
    return connection.query(sql, [name, image, category, price]);
}


// Modificar producto
const updateProduct = (name, image, price, category, id) => {
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?";
    
    return connection.query(sql, [name, image, price, category, id]);
}


// Eliminar producto
const deleteProduct = (id) => {
     // Optimizacion 3: Prescindimos de const { id } = req.params; gracias a validateId

    // Optimizacion 4: Extraemos el resultado en [result]
    return connection.query("DELETE FROM products WHERE id = ?", [id]);
}


export default {
    selectAllProducts,
    selectProductsById,
    insertNewProduct,
    updateProduct,
    deleteProduct
}