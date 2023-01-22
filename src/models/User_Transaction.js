const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('user_Transaction',{
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
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        role: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
       
    })
};