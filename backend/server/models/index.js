// models/index.js
import sequelize from "../config/db.js";
import Usuario from "./user.js";
import CarritoDetalle from "./carritoDetalle.js";
import Producto from "./producto.js";

Usuario.hasOne(Carrito, {
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});

Carrito.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Carrito.hasMany(CarritoDetalle, {
  foreignKey: "carritoId",
  onDelete: "CASCADE",
});

CarritoDetalle.belongsTo(Carrito, {
  foreignKey: "carritoId",
});

Perfume.hasMany(CarritoDetalle, {
  foreignKey: "perfumeId",
  onDelete: "CASCADE",
});

CarritoDetalle.belongsTo(Producto, {
  foreignKey: "perfumeId",
});

export {
  sequelize,
  Usuario,
  Producto,
  Carrito,
  CarritoDetalle,
};
