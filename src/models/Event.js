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
            type: DataTypes.DATEONLY,
            allowNull:true,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull:true,
        },
        start_time:{
            type: DataTypes.TIME,
            allowNull:true
        },
        end_time:{
            type: DataTypes.TIME,
            allowNull:true
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
            type: DataTypes.ENUM('ALL PUBLIC', '+13', '+16', '+18'),
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
        },
        disability_access: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        parking: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        smoking_zone: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
        pet_friendly: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },    
    })
};