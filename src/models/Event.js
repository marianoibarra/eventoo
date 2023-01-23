const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('user',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true,  
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        start_Date: {
            type: DataTypes.TIMETAMPTZ,
            allowNull:true,
        },
        end_Date: {
            type: DataTypes.TIMETAMPTZ,
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
        age_Range: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        guests_Capacity: {
            type: DataTypes.BIGINT,
            allowNull:true,
        },
        placeName: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        created_at: {
            type: DataTypes.TIMETAMPTZ,
            allowNull:true,
        },
        advertisingTime_start: {
            type: DataTypes.TIMETAMPTZ,
            allowNull:true,
        },
        adversiting_end: {
            type: DataTypes.TIMETAMPTZ,
            allowNull:true,
        },
        cover_pic: {
            type: DataTypes.STRING,
            allowNull:true,
        }
    })
};