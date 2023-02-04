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
    const event = await Event.findByPk(id);

    const newReview = await Review.create({
        stars: stars ,
        comment: comment,
        
    })

   await event.addReview(newReview);
   return res.status(200).json({msg: 'revision added to event successfully'})
        
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const getReviews =  async (req,res) => {
    
    const { id }= req.params

    try {
        
        
        allreviews = await Event.findOne({
            where: {
               id: id
        }
        
    })
    
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
 

};


module.exports = {
    addReview,
    getReviews
}