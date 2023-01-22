const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('user',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: true,
            unique: true,  
        },
        email: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        password: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull:true,
        },
        last_name: {
            type: DataTypes.STRING(20),
            allowNull:true,
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        born: {
            type:DataTypes.DATE,
            allowNull:true,
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            allowNull:true,
        },
      
    })
};