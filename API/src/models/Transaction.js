const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Transaction',{
        isPaid: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        payment_proof: {
            type: DataTypes.STRING,
            allowNull: true,
        },       
    })
};


