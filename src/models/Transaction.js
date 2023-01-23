const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transaction',{
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