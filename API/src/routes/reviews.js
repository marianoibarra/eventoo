const { Router } = require("express");
const { addReview, getReviews } = require('../controllers/reviews');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, addReview);
router.get("/",  getReviews);


module.exports = router;