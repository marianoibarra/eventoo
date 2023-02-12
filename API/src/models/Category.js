const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('category',{
        name: { 
            type: DataTypes.STRING(40),
            allowNull: true,
        },   
        modality:{
            type: DataTypes.ENUM('Presential', 'Virtual')
        },
        isActive:{
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false
    })
};