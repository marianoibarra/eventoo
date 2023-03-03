const {
  Transaction,
  User,
  Event,
  Ticket,
  Category,
  Address,
  BankAccount,
} = require("../db");
const {
  sendBuyerNotifications,
  sendOrganizerNotifications,
} = require("../helpers/sendEmail");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const approvalTimeLimit = 5;
const percentageThreshold = 20;
const sendConfig = {approvalTimeLimit,percentageThreshold}

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
  }
  updateEventLowStock(IdEvent.id, percentageThreshold)
};

const updateEventLowStock = async (eventId,percentageThreshold) => {
  const event = await Event.findByPk(eventId);
  const availableTickets =event.stock_ticket;
  const percentageAvailable = (availableTickets / event.guests_capacity) * 100;
  const isLowStock = percentageAvailable <= percentageThreshold ;
  await event.update({ low_stock: isLowStock });
};

const createTransactions = async (req, res) => {
  try {
    const buyerId = req.userId;
    const { eventId, tickets } = req.body;

    const event = await Event.findByPk(eventId, {
      include: [
        {
          model: Transaction,
          as: "transactions",
        },
        {
          model: BankAccount,
          as: "bankAccount",
        },
        {
          model: User,
          as: "organizer",
        },
      ],
    });
    await cleanTransactions(event,approvalTimeLimit);
    await event.reload();
    const user = await User.findByPk(buyerId);
    const organizer = await User.findByPk(event.organizer.id);
    const bankAccount = await BankAccount.findByPk(event.bankAccount.id);

    if (event.stock_ticket < tickets.length) {
      // se verifica si hay suficiente stock de entradas
      return res.status(400).json({
        error: `Not enough tickets available for the event ${event.name}`,
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

    sendBuyerNotifications(
      user.email,
      "reserveTickets"
    );
    sendOrganizerNotifications(organizer.email, "reservationReceived");

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
        "$event.organizer.id$": userId,
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
    const { payment_proof, status, transactionId, format } = req.body;
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }
    await transaction.update({ payment_proof, status, format });
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
    const { payment_proof, format } = req.body;
    const { transactionId } = req.params;
    const transaction = await Transaction.findByPk(transactionId, {
      include: "tickets",
    });
    const buyer = await User.findByPk(transaction.buyerId);
    const event = await Event.findByPk(transaction.eventId, {
      include: { model: User, as: "organizer" },
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
      sendBuyerNotifications(buyer.email, "expiredReservation");
      return res.status(400).json({
        error:
          "Transaction has expired, status updated to EXPIRED and tickets have been returned to event",
      });
    }

    await transaction.update({ payment_proof, status: "INWAITING", format });
    sendBuyerNotifications(buyer.email, "receiptUploaded");
    sendOrganizerNotifications(
      event.organizer.email,
      "newTransfer",
      payment_proof
    );

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
    const buyer = await User.findByPk(transaction.buyerId);

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
      await transaction.update({ status: "DENIED" });
      const ticketsToReturn = transaction.tickets.length;
      const event = await Event.findByPk(transaction.eventId, {
        include: [
          {
            model: Address,
            as: "address",
            attributes: { exclude: ["id"] },
          },
        ],
      });
      await event.increment("stock_ticket", { by: ticketsToReturn });
      sendBuyerNotifications(buyer.email, "denied");
      return res.status(200).json({
        msg: `Transaction status updated to ${status}`,
        transaction,
      });
    }

    if (status === "APPROVED") {
      const tickets = await Ticket.findAll({
        where: {
          transactionId,
        },
      });

      const event = await Event.findByPk(transaction.eventId, {
        include: [
          {
            model: Address,
            as: "address",
            attributes: { exclude: ["id"] },
          },
        ],
      });
      const eventName = event.name;
      const doc = new PDFDocument({ autoFirstPage: false });
      const urls = [];

      const generateQr = async (t) => {
        return QRCode.toDataURL(`${t.id}`, {
          errorCorrectionLevel: "H",
          type: "image/jpeg",
          quality: 0.3,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
      };

      for (t of tickets) {
        const promise = await generateQr(t);
        urls.push(promise);
      }

      urls.forEach((url, index) => {
        const t = tickets[index];
        const stringAddress = event.address.address_line.concat(
          `, ${event.address.city}, ${event.address.state}`
        );
        doc.addPage();
        doc.fontSize(32).text(`${eventName}'s ticket`, {
          align: "center",
        });
        doc.moveDown(1);
        doc.image(url, 40, 145, { width: 150, height: 150 });
        doc.fontSize(14).text(`${t.id}`, 100, 300).moveDown();
        doc
          .text(`Titular: ${t.name} ${t.last_name}`, 325, 150, {
            width: 410,
          })
          .moveDown();
        doc
          .text(`Date: ${event.start_date}`, 325, 180, { width: 410 })
          .moveDown();
        doc
          .text(`Time: ${event.start_time}`, 325, 210, { width: 410 })
          .moveDown();
        doc.text(`Price: ${event.price}`, 325, 240, { width: 410 }).moveDown();
        stringAddress.length <= 31
          ? doc
              .text(
                `Address: ${event.address.address_line}, ${event.address.city}, ${event.address.state}`,
                325,
                270,
                { width: 410 }
              )
              .moveDown()
          : doc
              .text(`Address: ${event.address.address_line}, `, 325, 270, {
                width: 410,
              })
              .moveDown()
              .text(`${event.address.city}, ${event.address.state}`, 325, 290, {
                width: 410,
              });
        doc
          .lineWidth(2)
          .lineJoin("round")
          .rect(20, 120, 570, 200)
          .strokeColor("#007F80")
          .stroke();
        doc.text(
          `      Thank you for your purchase,
          we hope you enjoy the event. See you soon!`,
          20,
          600,
          { align: "center" }
        );
        doc.save();
      });
      doc.end();
      sendBuyerNotifications(buyer.email, "accepted");
      sendBuyerNotifications(buyer.email, "tickets", event.id, doc);
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
    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }
    await transaction.update({ payment_proof, status: "CANCELED" });

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
  sendConfig,
};
