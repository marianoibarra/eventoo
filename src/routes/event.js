const { Router } = require("express");
const { createEvent } = require("../controllers/createEvent");
const { getEvents } = require("../controllers/getEvents");
const { modifyEvent } = require("../controllers/modifyEvent");
const { deleteEvent } = require("../controllers/deleteEvent");

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", modifyEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
