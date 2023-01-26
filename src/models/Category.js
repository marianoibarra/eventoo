const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('category',{
        modality:{
            type: DataTypes.ENUM('PRESENTIAL', 'VIRTUAL'),
            allowNull: true,
        },
        name: { //subcategorias
            type: DataTypes.STRING(20),
            allowNull: true,
        }                                              
    })
};