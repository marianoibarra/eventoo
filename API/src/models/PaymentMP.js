const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define("paymentMP",{

        transactionId_MP: {
            type: DataTypes.STRING,
            allowNull: true,
        },          
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },             
        unit_price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }              
    })
};

//transactcion id para que el usuario pueda verificar en su mercado pago la compra. 
 //status: estado de la transaccion proporcionada por mercado pago
 //precio (payment.items[0].price )


