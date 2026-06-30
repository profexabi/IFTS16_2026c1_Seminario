/*============================
    Controladores usuario
============================*/

import UserModels from "../models/user.models.js";
import bcrypt from "bcrypt"; // Importamos bcrypt

/////////////////////
// Crear usuario admin
export const createUser = async (req, res) => {
    try {
        const { nameUser, mailUser, passwordUser } = req.body;

        if (!nameUser, !mailUser, !passwordUser) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            })
        }

        const saltRounds = 10;

        // Hasheamos la contraseña del usuario
        const hashedPassword = await bcrypt.hash(passwordUser, saltRounds);
        
        // Enviamos el password hasheado
        const [rows] = await UserModels.insertNewUser(nameUser, mailUser, hashedPassword);


        res.status(201).json({
            message: "Usuario admin creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.error("Error creando usuarios: ", error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}