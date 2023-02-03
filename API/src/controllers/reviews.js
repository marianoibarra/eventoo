const {
    Event,
    User,
    Review }
    = require("../db");


const addReview = async (req,res) => {
    const { id } = req.body;
    const userId  = req.userId;
  
};

const getReviews =  async (req,res) => {
    
    res.status(200).json({ message: 'Test Controller Working!' });
};


module.exports = {
    addReview,
    getReviews
}