const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ticket', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionId: {
      type: DataTypes.UUID,
      references: {
        model: 'transactions',
        key: 'id'
      },
      allowNull: true,
    },
  });
};