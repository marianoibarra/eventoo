const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("payment", {
    payment_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    merchant_order: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
};

//transactcion id para que el usuario pueda verificar en su mercado pago la compra.
//status: estado de la transaccion proporcionada por mercado pago
//precio (payment.items[0].price )
