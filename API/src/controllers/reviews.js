const { Event, User, Review } = require("../db");
const { sendOrganizerNotifications } = require("../helpers/sendEmail");

const createReview = async (req, res) => {
  const userId = req.userId;
  const { id, stars, comment } = req.body;

  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(id, {
      include: { model: User, as: "organizer" },
    });

    const reviewNotAllowed = await Event.findOne({
      where: { id: id },

      include: [
        {
          model: User,
          as: "organizer",
          where: { id: userId },
        },
      ],
    });

    if (reviewNotAllowed) {
      return res
        .status(400)
        .json({ msg: " Cannot add a review to your own created event" });
    }

    const existingReview = await Review.findOne({
      where: { eventId: id },
      include: [
        {
          model: User,
          where: { id: userId },
        },
      ],
    });

    if (existingReview) {
      return res.status(400).json({ msg: " The event already has a review " });
    }

    const newReview = await event.addReview(user, {
      through: { stars: stars, comment: comment },
    });
    sendOrganizerNotifications(
      event.organizer.email,
      "reviewReceived",
      null,
      newReview
    );
    return res.status(200).json({ newReview });
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

    const preResult = scoreByUser.map((a) => a.reviews.stars);
    const resultScore =
      preResult.reduce((acc, curr) => acc + curr) / preResult.length;

    return res.json({ userScore: resultScore.toFixed(2) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviewsByEvent,
  getUserScore,
};
