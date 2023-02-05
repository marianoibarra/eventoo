const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transaction',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
          },
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


