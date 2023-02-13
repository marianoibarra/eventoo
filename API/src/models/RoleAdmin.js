const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "roleAdmin",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER",
        validate: {
          customValidator: (value) => {
            const enums = ["USER", "ADMIN", "SUPERADMIN"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
