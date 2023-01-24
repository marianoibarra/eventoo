const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Event',{
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull:true,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull:true,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        isVirtual: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        virtualURL: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        isPremium: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        age_range: {
            type: DataTypes.STRING, // "12 - 50"
            allowNull:true,
        },
        guests_capacity: {
            type: DataTypes.BIGINT,
            allowNull:true,
        },
        placeName: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        advertisingTime_start: {
            type: DataTypes.DATE,
            allowNull:true,
        },
        adversiting_end: {
            type: DataTypes.DATE,
            allowNull:true,
        },
        cover_pic: {
            type: DataTypes.STRING,
            allowNull:true,
        }
    })
};