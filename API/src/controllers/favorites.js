const { 
  Event, 
  User, 
  Address, 
  Category, 
  BankAccount } 
  = require("../db");


const addFavorite = async (req, res) => {

  const { id } = req.body;
  const userId  = req.userId;

try {
  const user = await User.findByPk(userId);
  const event = await Event.findByPk(id);

  await user.addFavorites(event);

  return res.status(200).json({msg: 'event added to favorites successfully'});
} catch (error) {
  res.status(500).json({ msg: error.message })
}
};


const getFavorites = async (req, res) => {
  const userId  = req.userId;
  try {
   const user = await User.findByPk(userId)
   const favorites = await user.getFavorites({
    include: [
      Address,
      Category,
      BankAccount
    ]
   })
   
   return res.json( favorites );
  
  } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};
 

const deleteFavorite = async (req, res) => {

  try {
   const { id } = req.body;
   const userId  = req.userId;

   const user = await User.findByPk(userId);
   const event = await Event.findByPk(id);

   await user.removeFavorites(event);

   return res.status(200).json({msg: 'event removed of favorites successfully'});
 } catch (error) {
   res.status(500).json({ msg: error.message })
 }
};

module.exports = { 
 addFavorite,
 getFavorites,
 deleteFavorite 
};