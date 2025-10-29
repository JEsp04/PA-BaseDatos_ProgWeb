import Pago from "../models/pago.js";
import Orden from "../models/orden.js";
import { actualizarEstadoOrdenSegunPago } from "../utils/ordenUtils.js";

export const crearPago = async (req, res) => {
  try {
    const { ordenId, usuarioId, metodoPago, monto, estado } = req.body;
    if (!ordenId) return res.status(400).json({ message: "ordenId es obligatorio" });

    const orden = await Orden.findByPk(ordenId);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });

    const montoFinal = monto === undefined || monto === null ? Number(orden.total) : Number(monto);
    if (Number.isNaN(montoFinal) || montoFinal < 0) return res.status(400).json({ message: "monto inválido" });

    const pago = await Pago.create({
      ordenId,
      usuarioId: usuarioId ?? orden.usuarioId,
      metodoPago: metodoPago ?? null,
      monto: montoFinal,
      estado: estado ?? "pendiente",
      fechaPago: new Date(),
    });

    try {
      await actualizarEstadoOrdenSegunPago(ordenId, pago.estado);
    } catch (e) {
      console.error("Error actualizando estado de orden desde pago:", e);
    }

    const ordenActualizada = await Orden.findByPk(ordenId);
    return res.status(201).json({ pago, orden: ordenActualizada });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear pago", error: error.message || error });
  }
};

export const obtenerPagos = async (req, res) => {
  try {
    const where = {};
    if (req.query.ordenId) where.ordenId = req.query.ordenId;
    if (req.query.usuarioId) where.usuarioId = req.query.usuarioId;
    const pagos = await Pago.findAll({ where });
    return res.json(pagos);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener pagos", error: error.message || error });
  }
};

export const obtenerPagoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });
    return res.json(pago);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener pago", error: error.message || error });
  }
};

export const actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });

    const { monto, metodoPago, estado } = req.body;

    const updates = {};
    if (monto !== undefined) {
      const montoNum = Number(monto);
      if (Number.isNaN(montoNum) || montoNum < 0) return res.status(400).json({ message: "monto inválido" });
      updates.monto = montoNum;
    }
    if (metodoPago !== undefined) updates.metodoPago = metodoPago;
    if (estado !== undefined) updates.estado = estado;

    await pago.update(updates);

    try {
      await actualizarEstadoOrdenSegunPago(pago.ordenId, pago.estado);
    } catch (e) {
      console.error("Error actualizando estado de orden desde pago (update):", e);
    }

    const ordenActualizada = await Orden.findByPk(pago.ordenId);
    return res.json({ pago, orden: ordenActualizada });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar pago", error: error.message || error });
  }
};

export const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) return res.status(404).json({ message: "Pago no encontrado" });

    const ordenId = pago.ordenId;
    await pago.destroy();

    try {
      const pagosCompletados = await Pago.count({ where: { ordenId, estado: "completado" } });
      await actualizarEstadoOrdenSegunPago(ordenId, pagosCompletados > 0 ? "completado" : "pendiente");
    } catch (e) {
      console.error("Error actualizando estado de orden desde pago (delete):", e);
    }

    return res.json({ message: "Pago eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar pago", error: error.message || error });
  }
};