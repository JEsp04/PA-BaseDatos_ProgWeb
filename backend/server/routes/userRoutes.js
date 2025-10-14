import express from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.patch("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;