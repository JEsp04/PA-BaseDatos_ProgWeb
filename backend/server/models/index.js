// models/index.js
import sequelize from "../config/db.js";
import Usuario from "./user.js";
import CarritoDetalle from "./carritoDetalle.js";

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

CarritoDetalle.belongsTo(Perfume, {
  foreignKey: "perfumeId",
});

export {
  sequelize,
  Usuario,
  Perfume,
  Carrito,
  CarritoDetalle,
};
