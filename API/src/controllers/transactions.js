// const transactionData = {
//   status: status || "PENDING",
//   isPaid: isPaid || false,
//   payment_proof: payment_proof || null,
//   ticketCount: ticketCount || null
// };

const { Transaction, User, Event } = require("../db");

const createTransactions = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { isPaid, payment_proof, eventId, status, ticketCount } = req.body;

    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(buyerId);

    const newTransaction = await event.addTransactions(user, {
      through: {
        isPaid: isPaid,
        payment_proof: payment_proof,
        status: status,
        ticketCount: ticketCount,
      },
    });

    // const response = await newTransaction.reload({include: ['user', 'event']})

    return res.status(201).json({
      message: "Transaction created successfully",
      newTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: ["event"],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.status(200).json({
      transactions: user.transactions,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: ["user"],
        },
      ],
    });
    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }
    return res.status(200).json({
      transactions: event.transactions,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByEventOrganizer = async (req, res) => {
  try {
    const organizerId = req.userId
    const events = await Event.findAll({
      where: {
        organizerId: organizerId,
      },
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: ["user"],
        },
      ],
    });
    return res.status(200).json({
      transactions: events.map((event) => event.transactions).flat(),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    // const transactionId = req.params.id;
    const { payment_proof, status, transactionId } = req.body;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }
    await transaction.update({ payment_proof, status });
    return res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTransactions,
  getTransactionsByUser,
  getTransactionsByEvent,
  getTransactionsByEventOrganizer,
  updateTransaction,
};
