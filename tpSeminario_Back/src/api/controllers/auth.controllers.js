/*=======================
    Controladores
=======================*/

import connection from "../database/db.js";
import bcrypt from "bcrypt";

export const loginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduzca sus credenciales"
    });
}


// Funcionalidad login
export const loginFunctionality = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login",
                error: "Todos los campos son obligatorios"
            });
        }

        /* Sin bcrypt
        const sql = "SELECT * FROM users where email = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);
        */

        // Bcrypt 1 -> Seleccionamos usuario solo por el mail
        const sql = "SELECT * FROM users where email = ?";
        const [rows] = await connection.query(sql, [email]);

        if (rows.length === 0) {
            return res.render("login", {
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];
        console.table(user);

        // Bcrypt 2 -> Comparamos los passwords hasheados
        const match = await bcrypt.compare(password, user.password);
        console.log(match);

        // Si hay un match (true)
        if (match) {
            // Guardamos sesion
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
    
            // Redirigimos a la vista login
            res.redirect("/dashboard/index");

        } else {
            return res.render("login", {
                title: "Login",
                error: "Contraseña incorrecta"
            })
        }





    } catch (error) {
        console.log("Error en el login", error);

        res.status(500).json({
            message: "Error interno en el servidor"
        });
    }
}


// Funcionalidad cerrar sesion
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion ", err);
            return res.status(500).json({
                message: "Error al cerrar la sesion"
            });
        }
        res.redirect("/login");
    });
}