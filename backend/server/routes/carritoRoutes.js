import {Router} from 'express';

import {
    crearCarrito,
    obtenerCarrito,
    obtenerCarritoPorId,
    eliminarCarrito,
} from '../controllers/carrritoController.js';

const router = Router();

router.post('/crear', crearCarrito);
router.get('/obtener', obtenerCarrito);
router.get('/obtenerPor/:id', obtenerCarritoPorId);
router.delete('/eliminar/:id', eliminarCarrito);

export default router;