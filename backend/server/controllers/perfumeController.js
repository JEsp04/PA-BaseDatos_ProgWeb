import Perfume from "../models/Perfume.js";

export const crearPerfume = async (req, res) => {
  try {
    const perfume = await Perfume.create(req.body);
    res.status(201).json(perfume);
  } catch (error) {
    res.status(500).json({ message: "Error al crear perfume", error });
  }
};

export const obtenerPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.findAll();
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfumes", error });
  }
};

export const obtenerPerfumePorId = async (req, res) => {
  try {
    const perfume = await Perfume.findByPk(req.params.id);
    perfume ? res.json(perfume) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar perfume", error });
  }
};

export const actualizarPerfume = async (req, res) => {
  try {
    const perfume = await Perfume.findByPk(req.params.id);
    if (!perfume) return res.status(404).json({ message: "No encontrado" });

    await perfume.update(req.body);
    res.json(perfume);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar perfume", error });
  }
};

export const eliminarPerfume = async (req, res) => {
  try {
    const perfume = await Perfume.findByPk(req.params.id);
    if (!perfume) return res.status(404).json({ message: "No encontrado" });

    await perfume.destroy();
    res.json({ message: "Perfume eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar perfume", error });
  }
};
