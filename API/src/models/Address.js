const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Address',{
        address_line: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },                     
    }, {
        timestamps: false
    })
};