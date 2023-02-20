const { MP_ACCESS_TOKEN, SERVER_URL } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: MP_ACCESS_TOKEN,
});

const getMercadoPago = async (eventId, items, client_url) => {
  let preference = {
    items,
    back_urls: {
      success: `${SERVER_URL}/mercadopago/${eventId}`,
      failure: `${SERVER_URL}/mercadopago/${eventId}`,
      pending: `${SERVER_URL}/mercadopago/${eventId}`,
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
    external_reference: client_url
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return response.body.id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getMercadoPago;
