const {
  Transaction,
  User,
  Event,
  Ticket,
  Category,
  Address,
} = require("../db");

const createTransactions = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { eventId, tickets } = req.body;

    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(buyerId);

    const newTransaction = await Transaction.create(
      {
        tickets: tickets,
      },
      {
        include: ["tickets"],
      }
    );

    await newTransaction.setBuyer(user);
    await newTransaction.setEvent(event);

    await newTransaction.reload({
      include: [
        "tickets",
        {
          model: User,
          as: "buyer",
          attributes: ["id", "name", "last_name", "email"],
        },
        {
          model: Event,
          as: "event",
          include: [
            "bankAccount",
            {
              model: Address,
              as: "address",
              attributes: { exclude: ["id"] },
            },
            {
              model: User,
              as: "organizer",
              attributes: ["id", "name", "last_name", "profile_pic"],
            },
            {
              model: Category,
              as: "category",
              attributes: ["name", "modality"],
            },
          ],
        },
      ],
    });
    return res.status(201).json(
      newTransaction,
    );
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByUserBuyer = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: [
            "tickets",
            {
              model: Event,
              as: "event",
              include: [
                "bankAccount",
                {
                  model: Address,
                  as: "address",
                  attributes: { exclude: ["id"] },
                },
                {
                  model: User,
                  as: "organizer",
                  attributes: ["id", "name", "last_name", "profile_pic"],
                },
                {
                  model: Category,
                  as: "category",
                  attributes: ["name", "modality"],
                },
              ],
            },
          ],
        },
      ],
    });
    return res.status(200).json(user.transactions);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByUserSeller = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.findAll({
      where: {
        "$event.organizer.id$": userId
      },
      include: [
        "tickets",
        {
          model: User,
          as: "buyer",
          attributes: ["id", "name", "last_name", "email"],
        },
        {
          model: Event,
          as: "event",
          include: [
            "bankAccount",
            {
              model: Address,
              as: "address",
              attributes: { exclude: ["id"] },
            },
            {
              model: User,
              as: "organizer",
              attributes: ["id", "name", "last_name", "profile_pic"],
            },
            {
              model: Category,
              as: "category",
              attributes: ["name", "modality"],
            },
          ],
        },
      ],
    });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: [
            "tickets",
            {
              model: User,
              as: "buyer",
              attributes: ["id", "name", "last_name", "email"],
            },
          ],
        },
      ],
    });
    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }
    return res.status(200).json(event.transactions);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Transaction.findByPk(id, {
      include: [
        "tickets",
        {
          model: User,
          as: "buyer",
          attributes: ["id", "name", "last_name", "email"],
        },
        {
          model: Event,
          as: "event",
          include: [
            "bankAccount",
            {
              model: Address,
              as: "address",
              attributes: { exclude: ["id"] },
            },
            {
              model: User,
              as: "organizer",
              attributes: ["id", "name", "last_name", "profile_pic"],
            },
            {
              model: Category,
              as: "category",
              attributes: ["name", "modality"],
            },
          ],
        },
      ],
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTransactionsByEventOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.id;
    const events = await Event.findAll({
      where: {
        organizerId: organizerId,
      },
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: [{ model: User, as: "user", attributes: ["name"] }],
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

const completeTransaction = async (req, res) => {
  try {
    const { payment_proof } = req.body;
    const { transactionId } = req.params;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }
    await transaction.update({ payment_proof, status: "COMPLETED" });
    return res.status(200).json({
      msg: "Transaction completed successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const cancelTransaction = async (req, res) => {
  try {
    const { payment_proof } = req.body;
    const { transactionId } = req.params;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }
    await transaction.update({ payment_proof, status: "CANCELED" });
    return res.status(200).json({
      msg: "Transaction completed successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const showTicketsByTransactionId = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        {
          model: Ticket,
          as: "tickets",
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    return res.status(200).json({
      tickets: transaction.tickets,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTransactions,
  getTransactionsByUserBuyer,
  getTransactionsByEvent,
  getTransactionsByEventOrganizer,
  updateTransaction,
  showTicketsByTransactionId,
  completeTransaction,
  cancelTransaction,
  getTransactionById,
  getTransactionsByUserSeller
};
