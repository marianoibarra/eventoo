const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('EmailCode',{
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiration:{
            type: DataTypes.DATE,
            allowNull: true,
        }              
    }, {
        timestamps: false
    })
};