const { Event, User } = require("../db");


const addFavorite = async (req, res) => {

    const { id } = req.body;
    const userId  = req.userId;
  
 try {
  
    const user = await User.findByPk(userId);
    const eventFavorite = await Event.findByPk(id);

    await user.addEvent(eventFavorite, { as: 'eventFavorites'});

    const result = await User.findOne({
        where: {  userId: req.userId },
        include:  { model: Event, where: { id: req.body.id }, as: 'eventFavorites'},
      });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: "error adding favorite" });
  }
};


const getFavorites = async (req, res) => {
    const userId  = req.userId;
    try {
     const allFavorites = await User.findByPk(userId, {
         include: [ { model: Event, as: 'eventFavorites' }]    
     });
     
     return res.json( allFavorites );
    
    } catch (error) {
        res.status(404).json({ msg: "There are no favorite events associated with the user" });
     }
 };
 

 const deleteFavorite = async (req, res) => {

    const { id } = req.params;
    const userId  = req.userId;
  try {
    const user = await User.findByPk(userId);
    const eventFavorite = await Event.findByPk(id);
    await user.removeEvents(eventFavorite, { as: 'eventFavorites'});
    return res.status(204).json({});
  } catch (error) {
    return res.status(404).json({ error: "Error deleting favorite" });
  }
};

module.exports = { 
  addFavorite,
  getFavorites,
  deleteFavorite 
};

