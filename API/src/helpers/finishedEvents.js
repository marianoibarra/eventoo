const { Event, Transaction, User, Notification } = require("../db");
const { Op } = require("sequelize");
const cron = require("node-cron");
const { sendBuyerNotifications } = require("./sendEmail");
const moment = require("moment");

const cronJob = cron.schedule("* * * * *", async () => {
  try {
    const now = moment();
    const events = await Event.findAll({
      where: {
        [Op.or]: [
          {
            end_date: {
              [Op.lt]: now.format("YYYY-MM-DD"),
            },
          },
          {
            end_date: now.format("YYYY-MM-DD"),
            end_time: {
              [Op.lt]: now.format("HH:mm:ss"),
            },
          },
        ],
      },
    });

    for (const event of events) {
      const transactions = await Transaction.findAll({
        where: {
          eventId: event.id,
        },
      });

      for (const transaction of transactions) {
        const buyer = await User.findByPk(transaction.buyerId);

        const notification = await Notification.findOne({
          where: {
            userId: buyer.id,
            eventId: event.id,
          },
        });

        if (!notification || !notification.notified) {
          sendBuyerNotifications(buyer.email, "reviewEvent");

          if (notification) {
            notification.notified = true;
            await notification.save();
          } else {
            await Notification.create({
              userId: buyer.id,
              eventId: event.id,
              notified: true,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = cronJob;
