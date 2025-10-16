import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrdenDetalles = sequelize.define(
  "OrdenDetalles",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ordenId: { type: DataTypes.INTEGER, allowNull: false },
    productoId: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precioUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "orden_detalles",
    timestamps: true,
  }
);

OrdenDetalles.beforeCreate((detalle) => {
  const precio = parseFloat(detalle.precioUnitario) || 0;
  const cantidad = Number(detalle.cantidad) || 0;
  detalle.total = Number((precio * cantidad).toFixed(2));
});

OrdenDetalles.beforeUpdate((detalle) => {
  const precio = parseFloat(detalle.precioUnitario) || 0;
  const cantidad = Number(detalle.cantidad) || 0;
  detalle.total = Number((precio * cantidad).toFixed(2));
});

async function actualizarTotalOrden(ordenId) {
  if (!ordenId) return;
  const [rows] = await sequelize.query(
    "SELECT IFNULL(SUM(total),0) as suma FROM orden_detalles WHERE ordenId = ?",
    { replacements: [ordenId] }
  );
  const total = rows && rows[0] ? Number(parseFloat(rows[0].suma || 0).toFixed(2)) : 0;
  await sequelize.query("UPDATE ordenes SET total = ? WHERE id = ?", {
    replacements: [total, ordenId],
  });
}

OrdenDetalles.afterCreate(async (detalle) => {
  try {
    await actualizarTotalOrden(detalle.ordenId);
  } catch (e) {
    console.error("Error actualizando total de orden (afterCreate):", e);
  }
});

OrdenDetalles.afterUpdate(async (detalle) => {
  try {
    await actualizarTotalOrden(detalle.ordenId);
  } catch (e) {
    console.error("Error actualizando total de orden (afterUpdate):", e);
  }
});

OrdenDetalles.afterDestroy(async (detalle) => {
  try {
    await actualizarTotalOrden(detalle.ordenId);
  } catch (e) {
    console.error("Error actualizando total de orden (afterDestroy):", e);
  }
});

export default OrdenDetalles;