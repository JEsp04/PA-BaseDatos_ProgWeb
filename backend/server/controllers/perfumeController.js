import Perfume from "../models/Perfume.js";

//  Crear un perfume
export const crearPerfume = async (req, res) => {
  try {
    const perfume = await Perfume.create(req.body);
    res.status(201).json(perfume);
  } catch (error) {
    res.status(500).json({ message: "Error al crear perfume", error });
  }
};

//  Obtener todos los perfumes
export const obtenerPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.findAll();
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfumes", error });
  }
};

//  Obtener un perfume por ID
export const obtenerPerfumePorId = async (req, res) => {
  try {
    const perfume = await Perfume.findByPk(req.params.id);
    perfume ? res.json(perfume) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar perfume", error });
  }
};

//  Actualizar perfume
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

//  Eliminar perfume
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
