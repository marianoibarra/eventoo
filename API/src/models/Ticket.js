const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ticket', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};