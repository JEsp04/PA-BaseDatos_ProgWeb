import Pago from "../models/pago.js";
import Orden from "../models/orden.js";

export const crearPago = async (req, res) => {
  try {
    const { ordenId, usuarioId, monto } = req.body;

    const orden = await Orden.findByPk(ordenId);
    if (!orden) return res.status(404).json({ error: "Orden no encontrada" });

    const preference = {
      items: [{
        title: `Pago Orden #${ordenId}`,
        unit_price: Number(monto),
        quantity: 1,
      }],
      notification_url: "https://TU_NGROK/api/pagos/webhook",
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending"
      },
      auto_return: "approved",
    };

    const result = await mercadopago.preferences.create(preference);
    
    const pago = await Pago.create({
      ordenId,
      usuarioId,
      monto,
      metodoPago: "mercado_pago",
      preferenceId: result.body.id,
      estado: "pendiente",
    });

    return res.json({
      preferenceId: result.body.id,
      init_point: result.body.init_point,
      sandbox_init_point: result.body.sandbox_init_point
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creando pago" });
  }
};
