const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('bankAccount',{
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CBU:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        hasAnEvent: {
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }            
    }, 
    {
        timestamps: false
    })
};