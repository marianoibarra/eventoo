const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('role_Admin',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true  
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },              
    })
};