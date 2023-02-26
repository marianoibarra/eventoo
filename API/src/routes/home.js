const { Router } = require("express");
const {
  
  getEventsPublic,
  getCategories,
  getEventById,
  getAllPremiumEvents,
 
} = require("../controllers/home");

const router = Router();

router.get("/categories", getCategories);
router.get("/events", getEventsPublic);
router.get("/events/:id", getEventById);
router.get("/Premium", getAllPremiumEvents);


module.exports = router;
