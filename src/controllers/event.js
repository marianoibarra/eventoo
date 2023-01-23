const { Event } = require("../models/Event");
const { Address } = require("../models/Address");
const { Category } = require("../models/Category");

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
      address,
      isPremium,
      isPaid,
      age_Range,
      guests_capacity,
      placeName, 
      created_at, 
      advertisingTime_start,  
      adversiting_end,
      cover_pic
  } = req.body; // consultar accontbank, category and address... 

  try {
      const { address_line, city, state, country, zip_code } = address;
      const addressDb = await Address.findOrCreate({
          where: { address_line, city, state, country, zip_code },
      });
      const address_id = addressDb.id;
      const categoryDb = await Category.findOne({where : {name: category}});
      const category_id = categoryDb.id;

      if (!name ||
          !description || 
          !start_date || 
          !end_date ||
          !isPublic || 
          !isVirtual || 
          !virtualURL || 
          !category ||
          !address || 
          !isPremium ||
          !isPaid || 
          !age_Range || 
          !guests_capacity || 
          !placeName || 
          !created_at || 
          !advertisingTime_start ||
          !adversiting_end ||
          !cover_pic )
          {
              return res.status(400).json({
                  error: {
                      message: 'name, description, start_date, end_date, isPublic, isVirtual, virtualURL, category, address, isPremium, isPaid, age_Range, guests_capacity, placeName, created_at, advertisingTime_start, adversiting_end, cover_pic cannot be empty',
                      values: { ...req.body }
                  } 
          })
      }
      const event = await Event.create({
          name,
          description,
          start_date,
          end_date,
          isPublic,
          isVirtual,
          virtualURL,
          //accountBank,//
          categoryId : category_id,
          addressId : address_id,
          isPremium,
          isPaid,
          age_Range,
          guests_capacity,
          placeName, 
          created_at, 
          advertisingTime_start,  
          adversiting_end,
          cover_pic
      }).catch(e => {
          return res.status(500).json({
              error: {
                  message: "Error while creating resource",
                  values: { ...req.body }
              }
          })
      })
      
      address.forEach(async a => {
          const address = await Address.findOne({ where: { address_line: a.address_line, city: a.city, state: a.state, country: a.country, zip_code: a.zip_code } })
          if (address) await address.addEvent(event)
      });
      category.forEach(async c => {
          const category = await Category.findOne({ where: { name:c.name } })
          if (category) await season.addEvent(event)
      });
      const newEvent = await Event.findByPk(event.event_id, {
          include: [
              { model: Category, through: { attributes: [] } },
              { model: Address, through: { attributes: [] } }
          ]
      })
      return res.status(201).json(newEvent)
      
  } catch (error) {
      console.log(error)
      return res.status(500).json({
          error: {
              message: "Server error"}
      })
  }
}

const getEvents = async (req, res) => {
  try {
      const events = await Event.findAll({
          include: [
              { model: Category, through: { attributes: [] } },
              { model: BankAccount, through: { attributes: [] } },
              { model: Address, through: { attributes: [] } }
          ],
          order: [
              [ 'name', 'ASC' ]
          ]
  })
  return res.json(events)
  } catch (error) {
      console.log(error)
      return res.status(500).json({
          error: {
              message: "Server error"}
          })
  }
};

const modifyEvent = async (req, res) => {
  const { id } = req.params.id;
  const eventId = Number(id);
  const {
    name,
    description,
    start_date,
    end_date,
    isPublic,
    isVirtual,
    virtualURL,
    /* bank data obj,*/
    isPremium,
    isPaid,
    category,
    age_range,
    guests_capacity,
    address,
    placeName,
    cover_pic,
  } = req.body;
  try {
    const { address_line, city, state, country, zip_code } = address;
    const addressDb = await Address.findOrCreate({
      where: { address_line, city, state, country, zip_code },
    });
    const address_id = addressDb.id;
    const categoryDb = await Category.findOne({ where: { name: category } });
    const category_id = categoryDb.id;
    const eventFound = await Event.findByPk(eventId);
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
      CategoryId: category_id,
      age_range,
      guests_capacity,
      AddressId: address_id,
      placeName,
      cover_pic,
    });
    res.send("data updated successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params.id;
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