const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('bank_Account',{
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