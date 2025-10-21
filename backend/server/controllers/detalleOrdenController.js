import OrdenDetalles from "../models/detallesOrden.js";
import Producto from "../models/producto.js";
import { recalcularTotalOrden } from "../utils/ordenUtils.js";

export const crearDetalleOrden = async (req, res) => {
  try {
    const { ordenId, productoId, cantidad } = req.body;
    if (!ordenId || !productoId || !cantidad) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      return res.status(400).json({ message: "cantidad inválida; debe ser un entero >= 1" });
    }

    const producto = await Producto.findByPk(productoId);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    const precioUnitario = Number(producto.precio);
    if (Number.isNaN(precioUnitario)) return res.status(400).json({ message: "precio del producto inválido" });

    const total = Number((precioUnitario * cantidad).toFixed(2));

    const detalle = await OrdenDetalles.create({
      ordenId,
      productoId,
      cantidad,
      precioUnitario,
      total,
    });

    await recalcularTotalOrden(ordenId);

    return res.status(201).json(detalle);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear detalle de orden", error: error.message || error });
  }
};

export const obtenerDetallesOrden = async (req, res) => {
  try {
    const where = {};
    if (req.query.ordenId) where.ordenId = req.query.ordenId;
    const detalles = await OrdenDetalles.findAll({ where });
    return res.json(detalles);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener detalles de orden", error: error.message || error });
  }
};

export const obtenerDetalleOrdenPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await OrdenDetalles.findByPk(id);
    if (!detalle) return res.status(404).json({ message: "Detalle de orden no encontrado" });
    return res.json(detalle);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener detalle de orden", error: error.message || error });
  }
};

export const actualizarDetalleOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await OrdenDetalles.findByPk(id);
    if (!detalle) return res.status(404).json({ message: "Detalle de orden no encontrado" });

    const newProductoId = req.body.productoId ?? detalle.productoId;
    const newCantidad = req.body.cantidad !== undefined ? req.body.cantidad : detalle.cantidad;

    if (!Number.isInteger(newCantidad) || newCantidad < 1) return res.status(400).json({ message: "cantidad inválida; debe ser un entero >= 1" });

    const producto = await Producto.findByPk(newProductoId);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    const precioUnitario = Number(producto.precio);
    if (Number.isNaN(precioUnitario)) return res.status(400).json({ message: "precio del producto inválido" });

    const total = Number((precioUnitario * newCantidad).toFixed(2));

    await detalle.update({
      productoId: newProductoId,
      cantidad: newCantidad,
      precioUnitario,
      total,
    });

    await recalcularTotalOrden(detalle.ordenId);

    return res.json(detalle);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar detalle de orden", error: error.message || error });
  }
};

export const eliminarDetalleOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await OrdenDetalles.findByPk(id);
    if (!detalle) return res.status(404).json({ message: "Detalle de orden no encontrado" });

    const ordenId = detalle.ordenId;
    await detalle.destroy();

    await recalcularTotalOrden(ordenId);

    return res.json({ message: "Detalle de orden eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar detalle de orden", error: error.message || error });
  }
};