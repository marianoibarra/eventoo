const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Modality',{
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },              
    })
};