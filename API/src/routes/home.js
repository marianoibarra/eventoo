const { Router } = require("express");
const {
  
  getEventsPublic,
  getCategories,
  getEventById,
 
} = require("../controllers/home");

const router = Router();

router.get("/categories", getCategories);
router.get("/events", getEventsPublic);
router.get("/events/:id", getEventById);


module.exports = router;
