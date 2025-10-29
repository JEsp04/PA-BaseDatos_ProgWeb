import Carrito from '../models/carrito.js';
import CarritoDetalle from '../models/carritoDetalle.js';
import { recalcularTotal as recalcularTotalUtil } from '../utils/carritoUtils.js';

export const crearCarrito = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.total === undefined) payload.total = 0.0;
        const carrito = await Carrito.create(payload);
        res.status(201).json(carrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear carrito', error: error.message || error });
    }
};

export const obtenerCarrito = async (req, res) => {
    try {
        const carritos = await Carrito.findAll();
        res.json(carritos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carritos', error: error.message || error });
    }
};

export const obtenerCarritoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const carrito = await Carrito.findByPk(id, { include: [{ model: CarritoDetalle }] });
        if (!carrito) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carrito', error: error.message || error });
    }
};

export const eliminarCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Carrito.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json({ message: 'Carrito eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar carrito', error: error.message || error });
    }
};

export const recalcularTotal = recalcularTotalUtil;