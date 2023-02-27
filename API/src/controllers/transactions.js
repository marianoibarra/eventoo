const {
  Transaction,
  User,
  Event,
  Ticket,
  Category,
  Address,
} = require("../db");
require("dotenv").config();
const moment = require("moment");
const nodemailer = require('nodemailer');
// const fs = require("fs"); para pruebas locales de pdf
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const approvalTimeLimit = 20;

const cleanTransactions = async (IdEvent) => {
  const event = await Event.findByPk(IdEvent.id, {
    include: [
      {
        model: Transaction,
        as: "transactions",
        attributes: ["expiration_date", "status", "id"],
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
  const expiredTransactions = event.transactions.filter(
    (transaction) =>
      moment().isAfter(moment(transaction.dataValues.expiration_date)) &&
      transaction.dataValues.status === "PENDING"
  );

  if (expiredTransactions.length > 0) {
    // Devolver entradas al evento
    const ticketsToReturn = expiredTransactions.reduce(
      (total, transaction) => total + transaction.tickets.length,
      0
    );
    await event.increment("stock_ticket", { by: ticketsToReturn });

    await Transaction.update(
      { status: "EXPIRED" },
      {
        where: {
          id: expiredTransactions.map((transaction) => transaction.id),
        },
      }
    );
    updateEventLowStock(IdEvent.id)
  }
};

const updateEventLowStock = async (eventId) => {
  let percentageThreshold = 15
  const event = await Event.findByPk(eventId);

  const availableTickets = event.guests_capacity - event.stock_ticket;
  const percentageAvailable = (availableTickets / event.guests_capacity) * 100;

  const isLowStock = percentageAvailable <= percentageThreshold;

  await event.update({ low_stock: isLowStock });
};

const createTransactions = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { eventId, tickets } = req.body;

    const event = await Event.findByPk(eventId, {
      include: {
        model: Transaction,
        as: "transactions",
      },
    });

    await cleanTransactions(event);
    await event.reload();
    const user = await User.findByPk(buyerId);

    if (event.stock_ticket < tickets.length) {
      // se verifica si hay suficiente stock de entradas
      return res.status(400).json({
        error: `No hay suficientes entradas disponibles para el evento: ${event.name}`,
      });
    }
    const newTransaction = await Transaction.create(
      {
        tickets: tickets,
        expiration_date: moment().add(approvalTimeLimit, "minutes").toDate(),
      },
      {
        include: ["tickets"],
      }
    );

    await newTransaction.setBuyer(user);
    await newTransaction.setEvent(event);

    await event.update({ stock_ticket: event.stock_ticket - tickets.length });

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
              attributes: ["name", "modality", "image"],
            },
          ],
        },
      ],
    });
    return res.status(201).json(newTransaction);
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
                  attributes: ["name", "modality", "image"],
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
        "$event.organizer.id$": userId,
      },
      include: [
        "tickets",
        {
          model: User,
          as: "buyer",
          attributes: ["id", "name", "last_name", "email", "profile_pic"],
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
              attributes: ["name", "modality", "image"],
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
    const transaction = await Transaction.findByPk(transactionId, {
      include: "tickets",
    });

    // if (transaction.status !== "PENDING") {
    //   return res.status(400).json({
    //     error: "Transaction is not PENDING status",
    //   });
    // }
    // ---- descomentar validacion comentada para test ----

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }
    if (!payment_proof) {
      return res.status(400).json({
        error: "Payment proof is required",
      });
    }
    // Verifica si han pasado menos de 15 minutos desde la creación de la transacción
    const fifteenMinutesAgo = moment().subtract(approvalTimeLimit, "minutes");
    if (moment(transaction.createdAt).isBefore(fifteenMinutesAgo)) {
      // Si han pasado más de 15 minutos, devuelve las entradas al evento
      await transaction.update({ status: "EXPIRED" });
      const ticketsToReturn = transaction.tickets.length;
      const event = await Event.findByPk(transaction.eventId);
      await event.increment("stock_ticket", { by: ticketsToReturn });
      return res.status(400).json({
        error:
          "Transaction has expired, status updated to EXPIRED and tickets have been returned to event",
      });
    }
    const tickets = await Ticket.findAll({
      where: {
        transactionId,
      },
    });
    const event = await Event.findByPk(transaction.eventId);
    const eventName = event.name;
    const address = await Address.findByPk(event.addressId);
    const user = await User.findByPk(transaction.buyerId)
    const doc = new PDFDocument({ autoFirstPage: false });

    for (const t of tickets) {
      const url = await QRCode.toDataURL(`${t.id}`, {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        quality: 0.3,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      doc.addPage();
      doc.text(`${eventName}'s ticket`);
      doc.image(url, { width: 150, height: 150 });
      doc.text(`${t.id}`);
      doc.text(`Titular: ${t.name} ${t.last_name}`);
      doc.text(`Date: ${t.start_date}`);
      doc.text(`Time: ${t.start_time}`);
      doc.text(`Price: ${t.price}`);
      doc.text(`Address: ${address}`);
      event.cover_pic && doc.image(event.cover_pic, { width: 150, height: 150 });
      doc.save();
    }
    doc.end();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      secureConnection: false, 
      port: 465,
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
    });

    const options = {
      from: `Eventoo <${process.env.EMAIL_USER}>`,
      to: 'marianoibarratesta@outlook.com',
      subject: 'Tickets',
      text: 'Enjoy the event!!',
      attachments: [
        {
          filename: 'tickets.pdf',
          content: doc,
          contentType: 'application/pdf'
        }
      ]
    };

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log('Error sending mail: ', error);
      } else {
        console.log('Mail sent: ', info.response);
      }
    })

    await transaction.update({ payment_proof, status: "INWAITING" });
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

const ApprovePayment = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const { transactionId } = req.params;
    const userId = req.userId;

    // if (transaction.status !== "INWAITING") {
    //   return res.status(400).json({
    //     error: "Transaction is not in waiting status",
    //   });
    // }
    // ---- descomentar validacion comentada para test ----

    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        {
          model: Event,
          as: "event",
          attributes: ["organizerId"],
        },
        {
          model: Ticket,
          as: "tickets",
        },
      ],
    });

    if (transaction.event.dataValues.organizerId !== userId) {
      return res.status(401).json({
        error:
          "Unauthorized: You can only modify transactions of events you organized.",
      });
    }
    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    const status =
      isApproved === true || isApproved === "true"
        ? "APPROVED"
        : isApproved === false || isApproved === "false"
        ? "DENIED"
        : null;

    if (status === null) return res.status(401).json({ msg: "invalid status" });
    await transaction.update({ status });

    if (status === "DENIED") {
      // Si han pasado más de 15 minutos, devuelve las entradas al evento
      await transaction.update({ status: "CANCELED" });
      const ticketsToReturn = transaction.tickets.length;
      const event = await Event.findByPk(transaction.eventId);
      await event.increment("stock_ticket", { by: ticketsToReturn });
      return res.status(200).json({
        msg: `Transaction status updated to ${status}`,
        transaction,
      });
    }
    return res.status(200).json({
      msg: `Transaction status updated to ${status}`,
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
    const transaction = await Transaction.findByPk(transactionId, {
      include: "tickets",
    });

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    if (transaction.status === "PENDING") {
      const ticketsToReturn = transaction.tickets.length;
      const event = await Event.findByPk(transaction.eventId);
  
      await event.increment("stock_ticket", { by: ticketsToReturn });
      await transaction.update({ payment_proof, status: "CANCELED" });
    }

    updateEventLowStock(transaction.eventId);

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
  ApprovePayment,
  cancelTransaction,
  getTransactionById,
  getTransactionsByUserSeller,
};
