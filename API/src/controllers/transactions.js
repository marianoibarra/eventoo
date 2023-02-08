// const transactionData = {
//   status: status || "PENDING",
//   isPaid: isPaid || false,
//   payment_proof: payment_proof || null,
//   ticketCount: ticketCount || null
// };

const { Transaction, User, Event } = require('../db');


const createTransactions = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { status, isPaid, payment_proof, ticketCount, eventId } = req.body;

    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(buyerId);
    
     const newTransaction = await event.addTransaction(user, {
      through: {status:status, isPaid:isPaid,ticketCount:ticketCount}
    })
     return res.status(201).json({
      message: "Transaction created successfully",
      newTransaction: {
        ...newTransaction.dataValues,
        status,
        isPaid,
        ticketCount
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTransactions,
};
