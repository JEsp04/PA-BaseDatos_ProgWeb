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

export default CarritoDetalle;
