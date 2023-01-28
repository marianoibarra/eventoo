const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define("User_Transaction", {
    role: {
      type: DataTypes.ENUM('BUYER', 'SELLER'),
      allowNull: false
    }
  })
}
