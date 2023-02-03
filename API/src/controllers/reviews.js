const {
    Event,
    User,
    Review }
    = require("../db");


const addReview = async (req,res) => {
   
    const userId  = req.userId;
    const { id, stars, comment } = req.body;
    try {

    // const user = await User.findByPk(userId);
    // const event = await Event.findByPk(id);
    const newReview = await Review.create({
        id: id,
        stars:stars ,
        comment: comment,
        user: userId
    })

        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const getReviews =  async (req,res) => {
    
    res.status(200).json({ message: 'Test Controller Working!' });
};


module.exports = {
    addReview,
    getReviews
}