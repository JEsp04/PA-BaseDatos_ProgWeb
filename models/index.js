import sequelize from "../config/database.js";

import Usuario from "./user.js";
import Producto from "./producto.js";
import Carrito from "./carrito.js";
import CarritoDetalle from "./carritoDetalle.js";
import Orden from "./orden.js";
import OrdenDetalles from "./detallesOrden.js";
import Pago from "./pago.js";
import Envio from "./envio.js";


Usuario.hasOne(Carrito, {
  foreignKey: { name: "usuarioId", allowNull: false, unique: "uk_carrito_usuarioId" },
  onDelete: "CASCADE",
});
Carrito.belongsTo(Usuario, {
  foreignKey: { name: "usuarioId", allowNull: false, unique: "uk_carrito_usuarioId" },
});

Usuario.hasMany(Orden, {
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});
Orden.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Usuario.hasMany(Pago, {
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});
Pago.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

Carrito.hasMany(CarritoDetalle, {
  foreignKey: "carritoId",
  onDelete: "CASCADE",
});
CarritoDetalle.belongsTo(Carrito, {
  foreignKey: "carritoId",
});

Producto.hasMany(CarritoDetalle, {
  foreignKey: "productoId",
  onDelete: "CASCADE",
});
CarritoDetalle.belongsTo(Producto, {
  foreignKey: "productoId",
});

Orden.hasMany(OrdenDetalles, {
  foreignKey: "ordenId",
  onDelete: "CASCADE",
});
OrdenDetalles.belongsTo(Orden, {
  foreignKey: "ordenId",
});

Producto.hasMany(OrdenDetalles, {
  foreignKey: "productoId",
  onDelete: "CASCADE",
});
OrdenDetalles.belongsTo(Producto, {
  foreignKey: "productoId",
});

Orden.hasOne(Pago, {
  foreignKey: "ordenId",
  onDelete: "CASCADE",
});
Pago.belongsTo(Orden, {
  foreignKey: "ordenId",
});

Orden.hasOne(Envio, {
  foreignKey: "ordenId",
  onDelete: "CASCADE",
});
Envio.belongsTo(Orden, {
  foreignKey: "ordenId",
});

export {
  sequelize,
  Usuario,
  Producto,
  Carrito,
  CarritoDetalle,
  Orden,
  OrdenDetalles,
  Pago,
  Envio,
};
