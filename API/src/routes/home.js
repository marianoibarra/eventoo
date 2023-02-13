const { Router } = require("express");
const {
  getEventsPublic,
  getCategories,
  getEventById,
  checkEventPassword,
} = require("../controllers/home");

const router = Router();

router.get("/categories", getCategories);
router.get("/events", getEventsPublic);
router.get("/events/:id", getEventById);
router.get("/eventPassword/:id", checkEventPassword);

module.exports = router;
