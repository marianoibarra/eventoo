const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('category',{
        type:{
            type: DataTypes.ENUM('PRESENTIAL', 'VIRTUAL'),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        }                                              
    })
};