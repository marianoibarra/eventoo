const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('BankAccount',{
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CBU:{
            type: DataTypes.STRING,
            allowNull: true,
        }              
    })
};