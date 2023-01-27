const { Router } = require("express");
const { 
    modifyEvent, 
    deleteEvent, 
    createEvent, 
    getEvents, 
    getEventsByState,
    getPaidEvents,
    // getPublicEvents,
    getThisWeekend,
    getEventsToday,
    getByAgeRange,
    getMyEvents,
    getEventsByCategory
} = require('../controllers/event')

const { verifyToken } = require("../controllers/user");

const router = Router();

router.get("/", getEvents);

router.get("/byCity", getEventsByState);
router.get("/paid",  getPaidEvents);
// router.get("/public", getPublicEvents);
router.get("/byAgeRange", getByAgeRange);
router.get("/thisWeekend", getThisWeekend);
router.get("/today", getEventsToday);
router.get("/myEvents", verifyToken, getMyEvents);
router.get('/byCategory',getEventsByCategory);

router.post("/", createEvent); //agregar verifyToken!
router.put("/:id", modifyEvent); //agregar verifyToken!
router.delete("/:id", deleteEvent); //agregar verifyToken!

module.exports = router;


