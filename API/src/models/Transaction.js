const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transaction',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
          },  //PENDING COMPLETED FAILED CANCELED INWAITING
          status: {
            type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELED', 'INWAITING'  ),
            allowNull: false,
            defaultValue: 'PENDING'
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
            allowNull:false
        }
    })
};


