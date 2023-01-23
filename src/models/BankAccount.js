const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('bank_Account',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true  
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CBU:{
            type: DataTypes.BIGINT,
            allowNull: true,
        }              
    })
};