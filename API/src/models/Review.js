const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Review',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
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

