const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("notification", {
    notified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
