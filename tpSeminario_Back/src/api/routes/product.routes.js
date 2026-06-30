/*=======================
    Rutas producto
=======================*/

import { Router } from "express";
const router = Router();
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";



///////////////////
// GET all products
router.get("/", getAllProducts);



///////////////////
// GET product by id
router.get("/:id", validateId, getProductById);



///////////////////
// POST product
router.post("/", validateProduct, createProduct);



///////////////////
// PUT product
router.put("/", modifyProduct);



///////////////////
// DELETE product
router.delete("/:id", validateId, removeProduct);



export default router;
    