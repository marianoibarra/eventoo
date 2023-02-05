const {
    Event,
    User,
    Review }
    = require("../db");


const createReview = async (req,res) => {
   
    const userId  = req.userId;
    const { id, stars, comment } = req.body;
    try {

        const user = await User.findByPk(userId);
        const event = await Event.findByPk(id);
        const newReview= await event.addReview(user, {through: {stars: stars, comment: comment }})
  
    
        return res.status(200).json(newReview);

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const getAllReviewsByEvent =  async (req,res) => {
    
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);
        const allReviews = await event.findAll({ 
            include:[
                {
                    model: User,
                    as: 'review',
                    through:{attributes: ['stars','comment']}
                }
            ]})
        return res.json(allReviews)
    
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
 
};

const getUserScore = async (req,res) => {

    const { id } = req.params;

    try {
        const organizer = await User.findByPk(id);
        const scoreByUser = await organizer.findAll({ 
            include:[
                {
                    model: Event,
                    as: 'review',
                    through:{ attributes: ['stars'] }
                }
            ]
        });

        let result = scoreByUser[0]

        for (let i = 0; i < scoreByUser.length; i++){
            result += scoreByUser[i];
        };

        const totalScore = result / scoreByUser.length;

        return res.json( totalScore );

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createReview,
    getAllReviewsByEvent,
    getUserScore,
}