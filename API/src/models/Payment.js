const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('payment',{
        transactionId_MP: {
            type: DataTypes.STRING,
            allowNull: true,
        },          
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },             
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }              
    })
};

//transactcion id para que el usuario pueda verificar en su mercado pago la compra. 
 //: 
 //status: 
 //


//payments.items[0].price 

//un evento tiene un payment
//un payment tiene un evento 

//un usuario tiene muchos payments
//un payment tiene un solo usuario 
