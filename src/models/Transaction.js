const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('transaction',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true  
        },
        isPaid: {
            type: DataTypes.BOLEAN,
            allowNull: true,
        },
        payment_proof: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    })
};