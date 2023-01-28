const { Router } = require("express");
const {
  getPublicEvents,
  // getEvents,
  getEventsByState,
  getPaidEvents,
  getThisWeekend,
  getEventsToday,
  getByAgeRange,
  getEventsByCategory,
} = require("../controllers/home");

const router = Router();

router.get("/events", getPublicEvents);
router.get("/events/byState", getEventsByState);
router.get("/events/paid",  getPaidEvents);
router.get("/events/byAgeRange", getByAgeRange);
router.get("/events/thisWeekend", getThisWeekend);
router.get("/events/today", getEventsToday);
router.get("/events/byCategory",getEventsByCategory);
// router.get("/", getEvents);


module.exports = router;
