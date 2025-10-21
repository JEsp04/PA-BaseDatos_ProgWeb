import Orden from "../models/orden.js";
import OrdenDetalles from "../models/detallesOrden.js";

export async function recalcularTotalOrden(ordenId) {
  if (!ordenId) throw new Error("ordenId requerido");
  const detalles = await OrdenDetalles.findAll({ where: { ordenId } });
  const total = detalles.reduce((acc, d) => {
    const precio = parseFloat(d.precioUnitario) || 0;
    const cantidad = Number(d.cantidad) || 0;
    return acc + precio * cantidad;
  }, 0);
  const totalFixed = Number(total.toFixed(2));
  await Orden.update({ total: totalFixed }, { where: { id: ordenId } });
  return await Orden.findByPk(ordenId);
}

export async function actualizarEstadoOrdenSegunPago(ordenId, estadoPago) {
  if (!ordenId) throw new Error("ordenId requerido");
  let nuevoEstado = "pendiente";
  switch ((estadoPago || "").toString().toLowerCase()) {
    case "completado":
      nuevoEstado = "completada";
      break;
    case "pendiente":
      nuevoEstado = "pendiente";
      break;
    case "cancelado":
      nuevoEstado = "cancelada";
      break;
    default:
      nuevoEstado = "pendiente";
  }
  await Orden.update({ estado: nuevoEstado }, { where: { id: ordenId } });
  return await Orden.findByPk(ordenId);
}