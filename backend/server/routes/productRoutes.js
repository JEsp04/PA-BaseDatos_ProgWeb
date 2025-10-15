import express from "express";
import {
  crearProducto,
  obtenerProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";

const router = express.Router();

router.post("/", crearProducto);
router.get("/", obtenerProducto);
router.get("/:id", obtenerProductoPorId);
router.patch("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
