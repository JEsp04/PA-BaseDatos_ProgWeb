import Producto from "../models/producto.js";

export const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    producto ? res.json(producto) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar producto", error });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ message: "No encontrado" });

    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ message: "No encontrado" });

    await producto.destroy();
    res.json({ message: "Perfume eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
