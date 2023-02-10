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
            "FAILED",
            "CANCELED",
            "INWAITING",
          ];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    payment_proof: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // eventId: {
    //     type: DataTypes.STRING,
    //     allowNull:false
    // },
    ticketCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });
};
