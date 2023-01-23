const { Event } = require("../models/Event");

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
  deleteEvent,
};
