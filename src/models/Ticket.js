const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('ticket',{
        transaction_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },     
    })
};