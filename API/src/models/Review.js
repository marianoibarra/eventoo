const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('review',{
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

