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
    
        const allReviews = await Event.findAll({ 
            where: {id: id},
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
       
        const scoreByUser = await Event.findAll({ 
            where: { "$organizer.id$": id},
            include:[
                {
                    model: User,
                    as: 'review',
                    through:{ attributes: ['stars'] }
                },
                'organizer',
            ],
            raw: true
        });

        console.log(scoreByUser);

            const preResult = scoreByUser.map(a=> a.review).flat().map(s=> Number(s.stars));
            const resultScore = preResult.reduce((acc,curr) => acc + curr)/preResult.length;       

        return res.json( resultScore );

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createReview,
    getAllReviewsByEvent,
    getUserScore,
}