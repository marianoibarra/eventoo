
const { Transaction, User, Event, Ticket } = require("../db");

const createTransactions = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { isPaid, payment_proof, eventId, status, ticketCount, tickets } =
      req.body;

    ticketsArray = tickets;
    const event = await Event.findByPk(eventId);
    const user = await User.findByPk(buyerId);
    const newTransaction = await event.addTransactions(user, {
      through: {
        isPaid: isPaid,
        payment_proof: payment_proof,
        status: status === undefined || status === null ? 'PENDING' : status,
        ticketCount: ticketCount,
      },
    });

    for (let i = 0; i < ticketCount; i++) {
      const ticket = await Ticket.create({
        name: tickets[i].name,
        gmail: tickets[i].gmail,
        last_name: tickets[i].last_name,
        transactionId: newTransaction[newTransaction.length - 1].id,
      });
    }

    // console.log("Transaction ID:", newTransaction[newTransaction.length - 1].id, tickets);

    const createdTickets = await Ticket.findAll({
      where: {
        transactionId: newTransaction[newTransaction.length - 1].id,
      },
      attributes: [
        "id",
        "name",
        "gmail",
        "last_name",
        "createdAt",
        "updatedAt",
        "transactionId",
      ],
    });

    return res.status(201).json({
      message: "Transaction and tickets created successfully",
      newTransaction,
      tickets: createdTickets,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
// ----------------------------------------------------------------------------------
// const createTransactions = async (req, res) => {
  // try {
  //   const buyerId = req.userId;
  //   const { isPaid, payment_proof, eventId, status, ticketCount, tickets } = req.body;

  //   const event = await Event.findByPk(eventId);
  //   const user = await User.findByPk(buyerId);

  //   const transaction = await Transaction.create({
  //     isPaid: isPaid,
  //     payment_proof: payment_proof,
  //     status: status,
  //     ticketCount: ticketCount,
  //     eventId: event.id,
  //     buyerId: user.id,
  //   });

  //   const createdTickets = [];
  //   for (let i = 0; i < ticketCount; i++) {
  //     const ticket = await Ticket.create({
  //       name: tickets[i].name,
  //       gmail: tickets[i].gmail,
  //       last_name: tickets[i].last_name,
  //       transactionId: transaction.id,
  //     });
  //     createdTickets.push(ticket);
  //   }

  //   return res.status(201).json({
  //     message: "Transaction and tickets created successfully",
  //     newTransaction: transaction,
  //     tickets: createdTickets,
  //   });
  // } catch (error) {
  //   return res.status(500).json({
  //     error: error.message,
  //   });
  // }
// };
// ----------------------------------------------------------------------------------


const getTransactionsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: [
            {
              model: Event,
              as: "event",
              attributes: ['id', 'name', 'bankAccountId', 'organizerId']
            },
            {
              model: Ticket,
              as: "tickets",
            },
          ],
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
    const eventId = req.params.id
    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: [
            {model:User,
              as:"user",
              attributes: ["name"]}
          ],
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
    const organizerId = req.params.id;
    const events = await Event.findAll({
      where: {
        organizerId: organizerId,
      },
      include: [
        {
          model: Transaction,
          as: "transactions",
          include: [
            {model:User,
              as:"user",
              attributes: ["name"]}
          ],
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
  getTransactionsByUser,
  getTransactionsByEvent,
  getTransactionsByEventOrganizer,
  updateTransaction,
  showTicketsByTransactionId,
};
