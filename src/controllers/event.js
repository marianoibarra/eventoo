const { Event } = require("../models/Event");
const { Address } = require("../models/Address");
const { Category } = require("../models/Category");

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
  modifyEvent,
  deleteEvent,
};