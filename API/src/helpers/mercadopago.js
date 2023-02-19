const { MP_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    MP_ACCESS_TOKEN,
});

const getMercadoPago = async (items) => {
  let preference = {
    items,
    back_urls: {
      success: " ",
      failure: " ",
      pending: " ",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  try {
    const response = await mercadopago.preferences.create(preference)
    return response.body.id
    
  } catch (error) {
    console.log(error);
  }

};

module.exports = getMercadoPago
