import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Carrito from "./carrito.js";
import Producto from "./producto.js";

const CarritoDetalle = sequelize.define(
  "CarritoDetalle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    carritoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Carrito,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "carrito_detalles",
    timestamps: false,
  }
);

CarritoDetalle.beforeCreate((detalle) => {
  detalle.subtotal = detalle.cantidad * detalle.precioUnitario;
});

CarritoDetalle.beforeUpdate((detalle) => {
  if (detalle.changed('cantidad') || detalle.changed('precioUnitario')) {
    detalle.subtotal = detalle.cantidad * detalle.precioUnitario;
  }
});

async function actualizarTotalParaCarrito(carritoId) {
  if (!carritoId) return;
  const detalles = await CarritoDetalle.findAll({ where: { carritoId } });
  const total = detalles.reduce((sum, d) => {
    const precio = parseFloat(d.precioUnitario) || 0;
    const cantidad = Number(d.cantidad) || 0;
    return sum + precio * cantidad;
  }, 0);
  const totalFixed = Number(total.toFixed(2));
  await Carrito.update({ total: totalFixed }, { where: { id: carritoId } });
}

CarritoDetalle.afterCreate(async (detalle) => {
  try {
    await actualizarTotalParaCarrito(detalle.carritoId);
  } catch (err) {
    console.error('Error actualizando total después de crear detalle:', err);
  }
});

CarritoDetalle.afterUpdate(async (detalle) => {
  try {
    await actualizarTotalParaCarrito(detalle.carritoId);
  } catch (err) {
    console.error('Error actualizando total después de actualizar detalle:', err);
  }
});

CarritoDetalle.afterDestroy(async (detalle) => {
  try {
    await actualizarTotalParaCarrito(detalle.carritoId);
  } catch (err) {
    console.error('Error actualizando total después de eliminar detalle:', err);
  }
});

export default CarritoDetalle;
