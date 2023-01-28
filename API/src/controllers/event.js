const { Event, Address, Category, User_Event, User } = require("../db");
const { Op } = require("sequelize");
const moment = require("moment");
const e = require("express");

const createEvent = async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    isPublic,
    virtualURL,
    //accountBank,//
    category,
    isPremium,
    isPaid,
    age_range,
    guests_capacity,
    placeName,
    advertisingTime_start,
    adversiting_end,
    cover_pic,
    address_line,
    city,
    state,
    country,
    zip_code,
    disability_access,
    parking,
    smoking_zone,
    pet_friendly,
  } = req.body; // consultar accontbank, modalityName and address...

  try {
    // if (!name ||
    //     !description ||
    //     !start_date ||
    //     !end_date ||
    //     !start_time ||
    //     !end_time ||
    //     !isPublic ||
    //     !virtualURL ||
    //     !isPremium ||
    //     !isPaid ||
    //     !age_Range ||
    //     !guests_capacity ||
    //     !placeName ||
    //     !created_at ||
    //     !advertisingTime_start ||
    //     !adversiting_end ||
    //     !cover_pic ||
    //     !address_line ||
    //     !state ||
    //     !city ||
    //     !country ||
    //     !zip_code
    //     !disability_access ||
    //     !parking ||
    //     !smoking_zone ||
    //     !pet_friendly
    //     )
    //     {
    //         return res.status(400).json({
    //             error: {
    //                 message: 'name, description, start_date, end_date, isPublic, modality, virtualURL, modalityName, category, address, isPremium, isPaid, age_Range, guests_capacity, placeName, created_at, advertisingTime_start, adversiting_end, cover_pic cannot be empty',
    //                 values: { ...req.body }
    //             }
    //     })
    // }
    const event = await Event.create(
      {
        name,
        description,
        start_date,
        end_date,
        start_time,
        end_time,
        isPublic,
        virtualURL,
        isPremium,
        isPaid,
        age_range,
        guests_capacity,
        placeName,
        advertisingTime_start,
        adversiting_end,
        cover_pic,
        disability_access,
        parking,
        smoking_zone,
        pet_friendly,

        Address: {
          address_line,
          city,
          state,
          country,
          zip_code,
        },
      },
      {
        include: [Address],
      }
    );

    // const user = await User.findOne({where: { id: req.userId}})
    // await event.addUser(user, { through: {role: 'CREATOR'}})

    const categoryDb = await Category.findOne({
      where: { name: category },
    });

    await event.setCategory(categoryDb);
    await event.addUsers(req.userId, { through: { role: "CREATOR" } });

    await event.reload({
      include: [
        { model: Category, attributes: ["name", "modality"] },
        { model: Address },
        {
          model: User,
          as: "users",
        },
        /*
        { model: User,
          attributes: ['id'],
          as: 'users',
          through: {
            attributes: ['role']
          }
        }
        ,*/
      ],
    });

    return res.status(201).json(event);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{ model: Category }, { model: Address }],
      order: [["name", "ASC"]],
    });
    return res.json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: "Server error",
      },
    });
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
          where: { ispublic: true },
          include: [
            { model: Category },
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
      include: [{ model: Address }, { model: Category }],
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

const getPublicEvents = async (req, res) => {
  try {
    const publicEvents = await Event.findAll({
      where: { isPublic: true },
      include: [{ model: Address }, { model: Category }],
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
}; // agregar filtro de ispublic

const getEventsToday = async (req, res) => {
  const today = moment().format("YYYY-MM-DD");

  try {
    const todayEvents = await Event.findAll({
      where: {
        [Op.and]: [{ start_date: today }, { isPublic: true }],
      },
      include: [{ model: Address }, { model: Category }],
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

const getByAgeRange = async (req, res) => {
  const { range } = req.query;
  try {
    const eventsByRange = await Event.findAll({
      where: {
        [Op.and]: [{ age_range: range }, { isPublic: true }],
      },
      include: [{ model: Address }, { model: Category }],
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

// const getMyEventsGuest = async (req, res) => {
//   try {
//     const userEvents = await User_Event.findAll({
//       where: {
//         UserId: req.userId,
//         role: 'GUEST'
//       },
//     });

//     if (!userEvents.length > 0) return res.status(500).send("You do not have any events");

//     const allMyEvents = []

//     for(let e of userEvents) {
//       let event = await Event.findOne({
//         where: {
//           [Op.and]: [
//             { id: e.EventId },
//             { isPublic: true },
//           ],
//         },
//         include: [Address, Category ],
//       });
//       allMyEvents.push(event)
//     }

//     console.log(allMyEvents);
//     res.json(allMyEvents);

//   } catch (error) {
//     res.status(404).json({ msg: error.message });
//   }
// }

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

const getEventByUser = async (req, res) => {
  try {
    const userEventsCreator = await User_Event.findAll({
      where: {
        [Op.and]: [{ UserId: req.userId }, { role: "CREATOR" }],
      },
    });

    const userEventsGuest = await User_Event.findAll({
      where: {
        [Op.and]: [{ UserId: req.userId }, { role: "GUEST" }],
      },
    });

    if (userEventsCreator.length === 0 && userEventsGuest.length === 0)
      return res.status(500).send("You do not have any events");

    const allMyEvents = [];

    for (let e of userEventsCreator) {
      let eventByCreator = await Event.findOne({
        where: {
          id: e.EventId,
        },
        include: [
          Address,
          Category,
          {
            model: User,
            as: "users",
            through: {
              attributes: ["role"],
            },
          },
        ],
      });

      allMyEvents.push({ ...eventByCreator.toJSON(), role: "CREATOR" });
    }

    for (let e of userEventsGuest) {
      let eventByGuest = await Event.findOne({
        where: {
          id: e.EventId,
        },
        include: [
          Address,
          Category,
          {
            model: User,
            as: "users",
            through: {
              attributes: ["role"],
            },
          },
        ],
      });
      allMyEvents.push({ ...eventByGuest.toJSON(), role: "GUEST" });
    }
    res.json(allMyEvents);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const modifyEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    isPublic,
    virtualURL,
    isPremium,
    isPaid,
    category,
    age_range,
    guests_capacity,
    placeName,
    cover_pic,
    address_line,
    city,
    state,
    country,
    zip_code,
    disability_access,
    parking,
    smoking_zone,
    pet_friendly,
  } = req.body;
  try {
    const eventFound = await Event.findByPk(id);

    const categoryDb = await Category.findOne({
      where: { name: category ? category : null },
    });

    if (address_line && city && state && country && zip_code) {
      const newAddress = await Address.create({
        address_line,
        city,
        state,
        country,
        zip_code,
      });
      await eventFound.setAddress(newAddress); //nop
    }

    if (category) await eventFound.setCategory(categoryDb);

    await eventFound.update({
      name,
      description,
      start_date,
      end_date,
      start_time,
      end_time,
      isPublic,
      category,
      virtualURL,
      isPremium,
      isPaid,
      age_range,
      guests_capacity,
      placeName,
      cover_pic,
      disability_access,
      parking,
      smoking_zone,
      pet_friendly,
    });

    const eventUpdated = await Event.findByPk(eventFound.id, {
      include: [
        { model: Address },
        { model: Category },
        { model: User, as: "users" },
      ],
    });

    res.send({ msg: "data updated successfully", data: eventUpdated });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const eventToBeDeleted = await Event.findByPk(id);
    await eventToBeDeleted.destroy();
    res.send("event removed successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEventByUser,
  modifyEvent,
  deleteEvent,
  // getEvents,
  // getEventsByState,
  // getPaidEvents,
  // getPublicEvents,
  // getThisWeekend,
  // getEventsToday,
  // getByAgeRange,

  // getMyEventsCreator,
  // getMyEventsGuest,

  // getByAgeRange,
  // getThisWeekend,
  // getEventsByCategory,
};