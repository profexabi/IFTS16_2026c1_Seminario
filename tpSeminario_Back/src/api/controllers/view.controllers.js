/*=======================
    Controladores
=======================*/

import productModels from "../models/product.models.js";

// Vista index
export const indexView = async (req, res) => {

    try {

        const [rows] = await productModels.selectAllProducts();
        
        res.render("index", {
            title: "Dashboard principal",
            about: "Listado Productos",
            productList: rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno al obtener vista"
        })
    }
}

// Vista get by id
export const getView = (req, res) => {
    res.render("get", {
        title: "Obtener producto",
        about: "Listado Productos"
    });
}

// Vista create
export const createView = (req, res) => {
    res.render("post", {
        title: "Crear producto",
        about: "Listado Productos"
    });
}


// Vista update
export const updateView = (req, res) => {
    res.render("put", {
        title: "Modificar producto",
        about: "Listado Productos"
    });
}

// Vista delete
export const deleteView = (req, res) => {
    res.render("delete", {
        title: "Eliminar producto",
        about: "Listado Productos"
    });
}