const { Event, User} = require("../db");


const createFavorites = async (req, res) => {
  try {
    const { id } = req.body;

    const userId  = req.userId;

    const favoritesEvents = await Event.findByPk(id)

    await favoritesEvents.addUser(userId);
    return res.status(201).json({favoritesEvents});
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// const getFavorites = async (req, res) => {
//     try {
//     const favoritesbyUser = await Event.findAll({
//         where: { UserId: req.userId },
//     });

//     } catch (error) {
        
//     }
// }
// Realiza una consulta para obtener los eventos favoritos de un usuario específico
// User.findByPk(userId, {
//   include: [{
//     model: Event,
//     through: {
//       model: Favorite
//     }
//   }]
// })
// .then(user => {
//   console.log(user.Events);
// });


module.exports = { 
  createFavorites,
  getFavorites,
  deleteFavorites 
};

//todos los post devuelven un 201. 
// los put un 204 no devuelven nada.
// los delete igual que los puts 