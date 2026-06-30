/*=======================
    Modelos usuario
=======================*/

import connection from "../database/db.js";

// Crear usuario
const insertNewUser = (name, mail, password) => {
    let sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    
    // Optimizacion 4: Devolvemos el id asignado al nuevo producto
    return connection.query(sql, [name, mail, password]);
}

export default {
    insertNewUser
}