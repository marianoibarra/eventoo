const { Router } = require("express");
const { modifyEvent, deleteEvent } = require('../controllers/event')

const router = Router();

//router.get("/", getEvents);
//router.post("/", createEvent);
router.put("/:id", modifyEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
