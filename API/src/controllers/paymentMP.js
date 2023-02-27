const { Event, User, Payment } = require("../db");

const manageMercadoPagoResponse = async (req, res) => {
  const response = req.query;
  const { eventId } = req.params;

  try {
    if (response.status === "approved") {
      const payment = await Payment.findByPk(response.preference_id);
      const event = await Event.findByPk(eventId);
      await payment.update({
        status: "approved",
        merchant_order: response.merchant_order,
        payment_id: response.payment_id,
      });
      await event.update({isActive: true})

      return res.redirect(`https://eventoo.com.ar/Event/${eventId}?checkout=true`);
    }

    const eventToDestroy = await Event.findByPk(eventId)
    if(eventToDestroy) await eventToDestroy.destroy()
    res.redirect(`${response.external_reference}/create-event?checkout_failed=true`);

  } catch (error) {
    res.redirect(`${response.external_reference}/create-event?internal_error=true`);
  }
};

/* QUERYS
{
  collection_id: '54905290045',
  collection_status: 'approved',
  payment_id: '54905290045',
  status: 'approved',
  external_reference: 'Reference_1234',
  payment_type: 'credit_card',
  merchant_order_id: '7823915402',
  preference_id: '1313548982-b849050d-8b84-434c-8005-daa998e65849',
  site_id: 'MLA',
  processing_mode: 'aggregator',
  merchant_account_id: 'null'
}
*/

const getAllPaymentsMP = async (req, res) => {
  try {
    const payments = await PaymentMP.findAll({
      order: [["id", "ASC"]],
      include: [
        { model: Event, attributes: ["id"] },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "last_name"],
        },
      ],
    });
    return res.json(payments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error with server" });
  }
};

module.exports = {
  getAllPaymentsMP,
  manageMercadoPagoResponse,
};
