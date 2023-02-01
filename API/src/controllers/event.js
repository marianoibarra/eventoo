const { Event, Address, Category, User_Event, User, BankAccount } = require("../db");
const { Op } = require("sequelize");


const createEvent = async (req, res) => {
  const userId = req.userId;
  const {
    name,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    isPublic,
    virtualURL,
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
    bankAccount,
  } = req.body;

 
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

    if (bankAccount) {
      const bankAccountFromDB = await BankAccount.findByPk(bankAccount);
      await event.setBankAccount(bankAccountFromDB);
    }

    if (category) {
      const categoryFromDB = await Category.findOne({
        where: { name: category },
      });
      await event.setCategory(categoryFromDB);
    }

    await event.addUsers(req.userId, { through: { role: "CREATOR" } });

    await event.reload({
      include: [{model: BankAccount},
        { model: Category, attributes: ["name", "modality"] },
        { model: Address },
        {
          model: User,
          as: "users",
        }
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
          BankAccount,
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
          BankAccount,
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
        {model: BankAccount},
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
};