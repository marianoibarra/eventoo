const { Router } = require("express");
const {
  // getPublicEvents,
  // getByPrivacity,
  // getEventsByState,
  // getPaidEvents,
  // getThisWeekend,
  // getEventsToday,
  // getByAgeRange,
  // getEventsByCategory,
  getEventsPublic,
  getCategories,
} = require("../controllers/home");

const router = Router();

// router.get("/events", getPublicEvents);
// router.get("/events/byState", getEventsByState);
// router.get("/events/paid",  getPaidEvents);
// router.get("/events/byAgeRange", getByAgeRange);
// router.get("/events/thisWeekend", getThisWeekend);
// router.get("/events/today", getEventsToday);
// router.get("/events/byCategory",getEventsByCategory);
// router.get("/events/:privacity",getByPrivacity)
router.get("/categories", getCategories)
router.get("/events", getEventsPublic)

module.exports = router;
