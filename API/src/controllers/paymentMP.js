const { Event, User, PaymentMP } = require("../db");

require("dotenv").config();
const { MP_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "APP_USR-3741912251079323-021822-5e0d0c71e7a4c5df84b17952e3378183-1313548982",
});

const setMercadoPago = async (req, res) => {
  const { eventId } = req.params;
  let preference = {
    // items: [
    //   {
    //     title: req.body.description,
    //     unit_price: Number(req.body.price),
    //     quantity: Number(req.body.quantity),
    //   },
    // ],
    items: [
      {
        title: "Mi producto",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 75.56,
      },
      {
        title: "Mi producto 2",
        quantity: 2,
        currency_id: "ARS",
        unit_price: 96.56,
      },
    ],
    back_urls: {
      success: `http://localhost:3000/mp2/${eventId}/`,
      failure: " ",
      pending: " ",
    },
    auto_return: "approved",
    binary_mode: true, // para que no se acepten pagos pendientes
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.send(response.body); // link de la compra que necesitamos
    })
    .catch(function (error) {
      console.log(error);
    });
};

// me guardo en la base de datos el pago de MP
const createPaymentMP = async (req, res) => {
  const { eventId } = req.body;
  const { userId } = req;
  const { payment_id, status, merchant_order_id } = req.query;
  try {
    const newPaymentMP = await PaymentMP.create(
      {
        // aqui corroborar que necesitamos que se guarde en base de datos por lo tanto esto esta a modo de prueba.
        transactionId_MP: payment_id,
        status: status,
        merchant_order: merchant_order_id,
      },
      { include: [Event, "user"] }
    );

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    await newPaymentMP.setUser(user);
    await newPaymentMP.setEvent(event);

    return res.status(201).json(newPaymentMP);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

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
  setMercadoPago,
  createPaymentMP,
  getAllPaymentsMP,
};
