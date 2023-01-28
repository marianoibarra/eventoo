const { Router } = require("express");
const {
  modifyEvent,
  deleteEvent,
  createEvent,
  getEventByUser,
  // getEvents,
  // getEventsByState,
  // getPaidEvents,
  // // getPublicEvents,
  // getThisWeekend,
  // getEventsToday,
  // getByAgeRange,

  // getEventsByCategory,
  // getMyEventsGuest
} = require("../controllers/event");

const { verifyToken } = require("../controllers/user");

const router = Router();

// router.get("/", getEvents);

// router.get("/byCity", getEventsByState);
// router.get("/paid",  getPaidEvents);
// // router.get("/public", getPublicEvents);
// router.get("/byAgeRange", getByAgeRange);
// router.get("/thisWeekend", getThisWeekend);
// router.get("/today", getEventsToday);

// router.get('/byCategory',getEventsByCategory);
// router.get('/myEventsGuest', verifyToken, getMyEventsGuest);
router.post("/", verifyToken, createEvent);
router.get("/", verifyToken, getEventByUser);
router.put("/:id", verifyToken, modifyEvent); //agregar verifyToken!
router.delete("/:id", verifyToken, deleteEvent); //agregar verifyToken!

module.exports = router;