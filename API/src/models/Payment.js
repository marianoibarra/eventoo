const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('payment',{
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },          
        payment_type:{
            type: DataTypes.STRING,
            allowNull: true,
        },             
        total:{
            type: DataTypes.FLOAT,
            allowNull: true,
        }              
    })
};



//un evento tiene un payment
//un payment tiene un evento 

//un usuario tiene muchos payments
//un payment tiene un solo usuario 
