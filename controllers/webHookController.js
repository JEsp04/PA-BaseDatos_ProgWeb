import mercadopago from "mercadopago";
import Pago from "../models/pago.js";
import Orden from "../models/orden.js";

export const recibirWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "payment") {
      const mpPayment = await mercadopago.payment.findById(data.id);
      const statusMP = mpPayment.body.status;
      const preferenceId = mpPayment.body.order.id;

      const pago = await Pago.findOne({ where: { preferenceId } });
      if (!pago) return res.sendStatus(404);

      let estadoOrden = "pendiente";
      let estadoPago = "pendiente";

     if (statusMP === "approved") {
        estadoPago = "completado";
        estadoOrden = "completada";
      }

      if (statusMP === "pending") {
        estadoPago = "pendiente";
        estadoOrden = "pendiente";
      }

      if (statusMP === "rejected") {
        estadoPago = "cancelado";
        estadoOrden = "cancelada";
      }

      await pago.update({ estado: estadoPago });

      const orden = await Orden.findByPk(pago.ordenId);
      if (orden) {
        await orden.update({
          estado: estadoOrden, 
        });
      }
    }

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
