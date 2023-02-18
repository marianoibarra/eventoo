const { Event, User, PaymentMP } = require("../db");
const { Op } = require("sequelize");

require("dotenv").config();
const { MP_TOKEN } = process.env;
const mercadopago = require("mercadopago");
mercadopago.configure({ access_token: MP_TOKEN });

const setMercadoPago = async (req, res) => {
      
      let preference = {
		items: [
			{
				title: req.body.description,
				unit_price:Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			success: "http://localhost:3000", 
			failure: " ",
			pending: " ",
		},
            auto_return: 'approved',
            binary_mode: true, // para que no se acepten pagos pendientes 
	
	};

	mercadopago.preferences.create(preference)
  .then(function(response){
  
    res.redirect(response.body.init_point); // link de la compra que necesitamos 
   
  }).catch(function(error){
    console.log(error);
  });
};




// me guardo en la base de datos el pago de MP 
const createPaymentMP =  async (req, res) => { 
      const payment = req.body;
      try {
            const newPaymentMP = await PaymentMP.create({ // aqui corroborar que necesitamos que se guarde en base de datos por lo tanto esto esta a modo de prueba. 
                  transactionId_MP: payment.transactionId_MP,
                  status: payment.status,
                  price: payment.items[0].price
            },{ include: [ Event, { model: User, as: "paymentMP" } ] })
            return res.status(201).json(newPaymentMP);
      } catch (error) {
            console.log(error);
    return res.status(500).json({
      error: {
        message: error.message,
      },
    })
}
};





const getAllPaymentsMP = async (req, res) => {

      try {
		const payments = await PaymentMP.findAll({
			order: [["id", "ASC"]],
			include: [
				{ model: Event, attributes: ["id"] },
				{ model: User, as: "organizer", attributes: ["id", "name", "last_name"] },				
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
      getAllPaymentsMP
};


