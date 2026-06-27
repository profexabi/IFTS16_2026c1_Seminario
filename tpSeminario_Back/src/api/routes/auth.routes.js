/*=======================
    Rutas
=======================*/

import { Router } from "express";
import { loginFunctionality, loginView, logout } from "../controllers/auth.controllers.js";
const router = Router();

router.get("/", loginView);

router.post("/", loginFunctionality);

router.post("/destroy", logout);

export default router;