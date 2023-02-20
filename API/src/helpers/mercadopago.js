const { MP_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: MP_ACCESS_TOKEN,
});

const getMercadoPago = async (eventId, items) => {
  let preference = {
    items,
    back_urls: {
      success: "http://localhost:3001/mercadopago/" + eventId,
      failure: "http://localhost:3001/mercadopago/" + eventId,
      pending: "http://localhost:3001/mercadopago/" + eventId,
    },
    auto_return: "approved",
    binary_mode: true,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm",
        },
        {
          id: "ticket",
        },
      ],
      installments: 1,
    },
    statement_descriptor: "Eventoo",
    external_reference: "Reference_1234",
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return response.body.id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getMercadoPago;
