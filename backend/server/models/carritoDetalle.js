import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Carrito from "./Carrito.js";
import Perfume from "./Perfume.js";

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
    perfumeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Perfume,
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
    timestamps: true,
  }
);

CarritoDetalle.beforeCreate((detalle) => {
  detalle.subtotal = detalle.cantidad * detalle.precioUnitario;
});

export default CarritoDetalle;
