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
            "EXPIRED",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    payment_proof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    format: {
      type: DataTypes.STRING,
    }
  });
};
