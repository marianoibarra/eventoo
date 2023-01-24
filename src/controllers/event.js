const { Event, Address, Category } = require("../db");

const createEvent = async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    isPublic,
    isVirtual,
    virtualURL,
    //accountBank,//
    category,
    isPremium,
    isPaid,
    age_Range,
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
  } = req.body; // consultar accontbank, category and address...

  try {
    // if (!name ||
    //     !description ||
    //     !start_date ||
    //     !end_date ||
    //     !isPublic ||
    //     !isVirtual ||
    //     !virtualURL ||
    //     !category ||
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
    //     )
    //     {
    //         return res.status(400).json({
    //             error: {
    //                 message: 'name, description, start_date, end_date, isPublic, isVirtual, virtualURL, category, address, isPremium, isPaid, age_Range, guests_capacity, placeName, created_at, advertisingTime_start, adversiting_end, cover_pic cannot be empty',
    //                 values: { ...req.body }
    //             }
    //     })
    // }
    const event = await Event.create({
      name,
      description,
      start_date,
      end_date,
      isPublic,
      isVirtual,
      virtualURL,
      isPremium,
      isPaid,
      age_Range,
      guests_capacity,
      placeName,
      advertisingTime_start,
      adversiting_end,
      cover_pic,
    }).catch((e) => {
      return res.status(500).json({
        error: {
          message: "Error while creating resource",
          values: { ...req.body },
        },
      });
    });

    event.createAddress({
      address_line,
      city,
      state,
      country,
      zip_code,
    });

    await Category.create({ name: category }); //QUITAR!

    const categoryDb = await Category.findOne({ where: { name: category } });

    await event.setCategory(categoryDb);

    const newEvent = await Event.findByPk(event.id, {
      include: [{ model: Category, attributes: ["name"] }, { model: Address }],
    });
    return res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        message: "Server error",
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

const modifyEvent = async (req, res) => {
  const { id } = req.params;
  const eventId = Number(id);
  const {
    name,
    description,
    start_date,
    end_date,
    isPublic,
    isVirtual,
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
  } = req.body;
  try {
    //     const addressDb = await Address.findOrCreate({
    //   where: { address_line, city, state, country, zip_code },
    // });
    // const address_id = addressDb.id;
    // const category_id = categoryDb.id;
    const eventFound = await Event.findByPk(eventId);
    await Category.create({ name: category }); //QUITAR!
    const categoryDb = await Category.findOne({
      where: { name: category ? category : null },
    });

    if (address_line && city && state && country && zip_code) {
      const newAddress = await Address.create({address_line, city, state, country, zip_code})
      await eventFound.setAddress(newAddress);
    }

    if (category) await eventFound.setCategory(categoryDb);

    await eventFound.update({
      name,
      description,
      start_date,
      end_date,
      isPublic,
      isVirtual,
      virtualURL,
      isPremium,
      isPaid,
      age_range,
      guests_capacity,
      placeName,
      cover_pic,
    });

    const eventUpdated = await Event.findByPk(eventFound.id, {
      include: [{ model: Address }, { model: Category }],
    });

    res.send({ msg: "data updated successfully", data: eventUpdated });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params
  const eventId = Number(id);
  try {
    const eventToBeDeleted = await Event.findByPk(eventId);
    await eventToBeDeleted.destroy();
    res.send("event removed successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  modifyEvent,
  deleteEvent,
};
