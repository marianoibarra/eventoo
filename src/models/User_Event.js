const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('user_Event',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true  
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        event_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('CREATOR', 'GUEST'),
            allowNull: true,
        },
       
    })
};