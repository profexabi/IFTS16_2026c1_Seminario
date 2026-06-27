/*=======================
    Rutas
=======================*/

import { Router } from "express";
import { createView, deleteView, getView, indexView, updateView } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();


router.get("/index", requireLogin, indexView);

router.get("/get", requireLogin, getView);

router.get("/post", requireLogin, createView);

router.get("/put", requireLogin, updateView);

router.get("/delete", requireLogin, deleteView);


export default router;