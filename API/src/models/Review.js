const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('review',{
        reviewId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
          },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        comment:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }             
    })
};

