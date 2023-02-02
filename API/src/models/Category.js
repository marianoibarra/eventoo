const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Category',{
        name: { 
            type: DataTypes.STRING(40),
            allowNull: true,
        },   
        modality:{
            type: DataTypes.ENUM('Presential', 'Virtual')
        },
    }, {
        timestamps: false
    })
};