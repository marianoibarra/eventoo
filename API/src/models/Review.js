const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Review',{
        stars: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: true,
        }              
    })
};