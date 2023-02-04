const { Router } = require("express");
const { createReview, getAllReviewsByEvent, getUserScore } = require('../controllers/reviews');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createReview); 
router.get("/:id",  getAllReviewsByEvent);
router.get("/", getUserScore)



module.exports = router;