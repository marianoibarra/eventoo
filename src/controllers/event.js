const { Op } = require('sequelize')
const { Event, Address, Category } = require("../db");
const moment = require("moment");

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
  } = req.body; 

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
      age_range,
      guests_capacity,
      placeName,
      advertisingTime_start,
      adversiting_end,
      cover_pic
    }).catch((e) => {
      return res.status(500).json({
        error: {
          message: "Error while creating resource",
          values: { ...req.body },
        },
      });
    });

    await event.createAddress ({
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

const getEventsByCity = async (req, res) => {

const { city, state } = req.query;
// city = city.trim();
// state = state.trim ();
 

  try { 
    if(city && state) {
      const recordcity = await Address.findOne({
        where: {
          city: {
          [ Op.iLike ]: `${city}%`},
          state: {
          [ Op.iLike ]: `${state}%`},       
        }
      })
      const idCity = recordcity.id
      const eventsByCity = await Event.findAll({
        where: {
             AddressId: idCity
          },
        include: [{ model: Category }, { model: Address }],
        order: [[ 'name', 'ASC' ]]
      })

      if (eventsByCity.length) return res.json(eventsByCity)
      return res.status(404).json({
        error:{
          message:'There are no events for that city...',
    
        }
      })
    }
    return res.status(404).json({
      error: {
          message: "There are no cities available with that name"}
      })     
   
  } catch (error) {
    console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"}
        })
  }

}

const getPaidEvents = async (req, res) => {
  try {
    const paidEvents = await Event.findAll({
      where: { isPaid: true },
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
      include: [{ model: Address }, { model: Category }]
    });
    if (publicEvents.length > 0) {
      res.json(publicEvents);
    } else {
      res.send("There are not public events");
    }
    
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}

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
};

const getEventsToday = async (req, res) => {

  const today= moment().format("YYYY-MM-DD");

  try {
    const todayEvents  = await Event.findAll({
      where: { start_date: today },
      include: [
        { model: Address },
        { model: Category},
      ],
    });
    if (todayEvents.length >0) {
      res.json(todayEvents);
    } else {
      res.status(404).send("There are not events today");
    }
  } catch (error) {
    res.status(404).json({error: error.message})
  }
};

const getByAgeRange = async (req, res) => {
  const { range } = req.query;
  try {
    const eventsByRange = await Event.findAll({
      where: {
        age_range: range,
      },
      include: [{ model: Address }, { model: Category }],
    });

   if(eventsByRange.length>0) {
    res.json(eventsByRange);
   } else {
    res.send("Sorry, there are not events with that age range")
   }
  } catch (error) {
    res.status(404).json({ error: error.message });
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
  getEventsByCity,
  getPaidEvents,
  getPublicEvents,
  getThisWeekend,
  getEventsToday,
  getByAgeRange,
  modifyEvent,
  deleteEvent,
};




