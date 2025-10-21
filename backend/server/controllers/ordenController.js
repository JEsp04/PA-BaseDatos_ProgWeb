import Orden from "../models/orden.js";
import { recalcularTotalOrden, actualizarEstadoOrdenSegunPago } from "../utils/ordenUtils.js";

export const crearOrden = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    if (!usuarioId) return res.status(400).json({ message: "usuarioId es obligatorio" });
    const orden = await Orden.create({ usuarioId, total: 0, estado: "pendiente" });
    return res.status(201).json(orden);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear orden", error: error.message || error });
  }
};

export const obtenerOrdenes = async (req, res) => {
    try {
    const ordenes = await Orden.findAll();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ordenes", error });
  }
};

export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Orden.findByPk(req.params.id);
    orden ? res.json(orden) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar orden", error });
  }
};


export const eliminarOrden = async (req, res) => {
  try {
    const orden = await Orden.findByPk(req.params.id);
    if (!orden) return res.status(404).json({ message: "No encontrado" });

    await orden.destroy();
    res.json({ message: "Perfume eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar orden", error });
  }
};


export const recalcularTotal = recalcularTotalOrden;
export const actualizarEstadoSegunPago = actualizarEstadoOrdenSegunPago;
