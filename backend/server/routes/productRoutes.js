import express from "express";
import {
  crearProducto,
  obtenerProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";

const router = express.Router();

router.post("/crear", crearProducto);
router.get("/obtener", obtenerProducto);
router.get("/obtenerPor/:id", obtenerProductoPorId);
router.patch("/actualizar/:id", actualizarProducto);
router.delete("/eliminar/:id", eliminarProducto);

export default router;
