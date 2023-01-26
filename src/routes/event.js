const { Router } = require("express");
const { 
    modifyEvent, 
    deleteEvent, 
    createEvent, 
    getEvents, 
    getEventsByCity,
    getPaidEvents,
    getPublicEvents,
    getThisWeekend,
    getEventsToday,
    getByAgeRange, 
} = require('../controllers/event')

const router = Router();

router.get("/", getEvents);
router.get("/byCity", getEventsByCity);
router.get("/paid",  getPaidEvents);
router.get("/public", getPublicEvents);
router.get("/byAgeRange", getByAgeRange);
router.get("/thisWeekend", getThisWeekend);
router.get("/today", getEventsToday);
router.post("/", createEvent);
router.put("/:id", modifyEvent);
router.delete("/:id", deleteEvent);

module.exports = router;


