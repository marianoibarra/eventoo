const { Event, Address, Category, User_Event, User } = require("../db");
const { Op } = require("sequelize");
const moment = require("moment");

const getPublicEvents = async (req, res) => {
  try {
    const publicEvents = await Event.findAll({
      where: { isPublic: true },
      include: [
        { model: Address },
        { model: Category },
        { model: User, as: "users" },
      ],
    });
    if (publicEvents.length > 0) {
      res.json(publicEvents);
    } else {
      res.send("There are not public events");
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getEventsByState = async (req, res) => {
  const { country, state } = req.query;

  try {
    if (country && state) {
      const addresses = await Address.findAll({
        where: {
          country: {
            [Op.iLike]: `${country}`,
          },
          state: {
            [Op.iLike]: `${state}`,
          },
        },
        attributes: ["id"],
      });

      const addressesIds = addresses.map((a) => a.id);

      const EventsByStates = await Event.findAll(
        {
          where: { isPublic: true },
          include: [
            { model: Category },
            { model: User, as: "users" },
            {
              model: Address,
              where: {
                id: {
                  [Op.in]: addressesIds,
                },
              },
            },
          ],
          order: [["name", "ASC"]],
        },
        {
          raw: true,
        }
      );

      if (EventsByStates.length) return res.json(EventsByStates);
      return res.status(404).json({
        error: {
          message: "There are no events for that state...",
        },
      });
    }
    return res.status(404).json({
      error: {
        message: "There are no cities available with that name",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: "Server error",
      },
    });
  }
};

const getPaidEvents = async (req, res) => {
  try {
    const paidEvents = await Event.findAll({
      where: {
        [Op.and]: [{ isPublic: true }, { isPaid: true }],
      },
      include: [
        { model: Address },
        { model: Category },
        { model: User, as: "users" },
      ],
    });
    if (paidEvents.length > 0) {
      res.json(paidEvents);
    } else {
      res.send("There are not paid events");
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
const getByAgeRange = async (req, res) => {
  const { range } = req.query;

  try {
    const eventsByRange = await Event.findAll({
      where: {
        [Op.and]: [{ age_range: range  }, { isPublic: true }],
      },
      include: [
        { model: Address },
        { model: Category },
        { model: User, as: "users" },
      ],
    });

    if (eventsByRange.length > 0) {
      res.json(eventsByRange);
    } else {
      res.send("Sorry, there are not events with that age range");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getThisWeekend = async (req, res) => {
  const saturday = moment().day(6).format("YYYY-MM-DD");
  const sunday = moment().day(7).format("YYYY-MM-DD");

  try {
    const eventsOnWeekend = await Event.findAll({
      where: {
        [Op.or]: [
          {
            start_date: sunday,
          },
          { start_date: saturday },
        ],
        isPublic: true,
      },
      include: [
        { model: Address },
        {
          model: Category,
        },
        { model: User, as: "users" },
      ],
    });
    if (eventsOnWeekend.length > 0) {
      res.json(eventsOnWeekend);
    } else {
      res.status(404).send("There are not events on this weekend");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getEventsToday = async (req, res) => {
  const today = moment().format("YYYY-MM-DD");

  try {
    const todayEvents = await Event.findAll({
      where: {
        [Op.and]: [{ start_date: today }, { isPublic: true }],
      },
      include: [
        { model: Address },
        { model: Category },
        { model: User, as: "users" },
      ],
    });
    if (todayEvents.length > 0) {
      res.json(todayEvents);
    } else {
      res.status(404).send("There are not events today");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getEventsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const events = await Event.findAll({
      where: { isPublic: true },
      include: [
        Address,
        {
          model: Category,
          where: {
            name: category,
          },
        },
        {
          model: User,
          as: "users",
          attributes: ["id"],
        },
      ],
    });

    if (events.length === 0)
      return res.send("There are not events with that modality");

    res.json(events);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getByPrivacity = async (req, res) => {
  const { privacity } = req.params;
  try {
    const events = await Event.findAll({
      where: { isPublic: privacity },
      include: [
        { model: Category },
        { model: Address },
        {
          model: User,
          as: "users",
          attributes: ["id"],
        },
      ],
      order: [["name", "ASC"]],
    });

    return res.json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

const getCategories = async (req, res) => {

  try {
    const { Virtual } = req.body;
    const categories = Virtual === "true"
    ? await Category.findAll({ where: { modality: 'Virtual' } })
    : Virtual === "false"
    ? await Category.findAll({ where: { modality: 'Presential' } })
    : await Category.findAll();
    return res.status(200).json({ categories });
    } catch (err) {
    return res.status(500).json({ error: 'An error occurred while getting the categories' });
    }
    };

module.exports = {
  getByPrivacity,
  getEventsByState,
  getPaidEvents,
  getPublicEvents,
  getThisWeekend,
  getEventsToday,
  getByAgeRange,
  getByAgeRange,
  getThisWeekend,
  getEventsByCategory,
  getCategories,
};
