const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('ticket',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true  
        },
        transaction_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },     
    })
};