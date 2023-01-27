const { Router } = require("express");
const {
  modifyEvent,
  deleteEvent,
  createEvent,
  getEvents,
  getPaidEvents,
  getEventsByCity,
  getByAgeRange,
  getThisWeekend,
  getMyEvents,
  getEventsByCategory,
} = require("../controllers/event");
const { verifyToken } = require("../controllers/user");

const router = Router();

router.get("/", getEvents);
router.get("/paid", getPaidEvents);
router.get("/byCity", getEventsByCity); 
router.get("/byAgeRange", getByAgeRange);
router.get("/thisWeekend", getThisWeekend);
router.get("/myEvents", verifyToken, getMyEvents);
router.get('/byCategory',getEventsByCategory);
router.post("/", createEvent);
router.put("/:id", modifyEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
