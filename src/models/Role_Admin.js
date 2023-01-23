const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('role_Admin',{
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },              
    })
};