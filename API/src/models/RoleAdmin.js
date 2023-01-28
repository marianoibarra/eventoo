const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('RoleAdmin', {
        name: {
            type: DataTypes.ENUM('USER', 'ADMIN', 'SUPERADMIN'),
            allowNull: false,
            defaultValue: 'USER'
        },          
    },{
        timestamps: false
    })
};