const { Event, User, Review } = require("../db");

const createReview = async (req, res) => {

  const userId = req.userId;
  const { id, stars, comment } = req.body;


  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(id);

    let existingReview = await User.findOne({
      where: { id: userId },
      include: [{
        model: Event,
        as: "reviews",
        where: { id: id },
        attributes: [ ],
      }]
    });

    let reviewNotAllowed = await Event.findOne({
      where:{ id : id},
      include: [{
        model: User,
        as: "organizer",
        where: { id: userId },
        attributes: [],
      }]
    });

    if (existingReview) {
      return res.status(400).json({msg: " the event already has a review ..." })
    }
    if (reviewNotAllowed) {
      return res.status(400).json({msg: " Cannot add a review to your own created event" })
    } 
    if (!existingReview && !reviewNotAllowed) {
    const newReview = await event.addReview(user, {
      through: { stars: stars, comment: comment },
    });
    return res.status(200).json(newReview)}
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

};

const getAllReviewsByEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Review.findAll({
      where: { eventId: id },
      attributes: ["stars", "comment", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "last_name", "email", "profile_pic"],
        },
      ],
    });

    return res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserScore = async (req, res) => {
  const { id } = req.params;

  try {
    const scoreByUser = await Event.findAll({
      where: { "$organizer.id$": id },
      include: [Review, "organizer"],
      raw: true,
      nest: true,
    });

    const preResult = scoreByUser.map(a => a.reviews.stars)
    const resultScore = preResult.reduce((acc, curr) => acc + curr) / preResult.length;

    return res.json({ userScore: resultScore.toFixed(2) });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviewsByEvent,
  getUserScore,
};
