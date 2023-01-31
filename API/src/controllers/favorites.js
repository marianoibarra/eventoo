const { Event, User} = require("../db");


const createFavorite = async (req, res) => {
  try {
    const { id } = req.body;

    const userId  = req.userId;

    const favoriteEvent = await Event.findByPk(id)

    await favoriteEvent.addUser(userId);
    return res.status(201).json({favoriteEvent});
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};


const getFavorites = async (req, res) => {
    const userId  = req.userId;
    try {
     const allFavorites = await User.findByPk(userId, {
         include: [ { model: Event, as: 'Favorites' }]    
     });
     return res.status(200).json({ allFavorites });

    } catch (error) {
        res.status(404).json({ msg: "There are no favorite events associated with the user" });
     }
 };
 

 const deleteFavorite = async (req, res) => {
  try {
    const userId  = req.userId;

    const favoriteToBeDeleted = await Event.findOne( { where: { id: req.params.id, UserId: userId } }) 
    await favoriteToBeDeleted.destroy();
    res.send("Favorite removed successfully");
  } catch (error) {
    res.status(404).json({ error: "Error deleting favorite" });
  }
};



module.exports = { 
  createFavorite,
  getFavorites,
  deleteFavorite 
};

