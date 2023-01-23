const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define("User_Event", {
    role: {
      type: DataTypes.ENUM('CREATOR', 'GUEST'),
      allowNull: false
    }
  })
}
