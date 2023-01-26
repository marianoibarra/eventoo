const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('category',{
        modalityName:{
            type: DataTypes.ENUM('PRESENTIAL', 'VIRTUAL')
        },
        categoryName: { //subcategorias
            type: DataTypes.STRING(20),
            allowNull: true,
        },              
    })
};