const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('category',{
        modalityName:{
            type: DataTypes.ENUM('PRESENTIAL', 'VIRTUAL')
        },
        categoryName: { 
            type: DataTypes.STRING(40),
            allowNull: true,
        }     
    }, {
        timestamps: false
    })
};