const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
      validate: {
        customValidator: (value) => {
          const enums = [
            "PENDING",
            "COMPLETED",
            "APPROVED",
            "DENIED",
            "CANCELED",
            "INWAITING",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    payment_proof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
