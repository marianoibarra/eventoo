const { Router } = require("express");
const {
  modifyEvent,
  deleteEvent,
  createEvent,
  getEventByUser,  
} = require("../controllers/event");

const { verifyToken} = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createEvent);
router.get("/", verifyToken, getEventByUser);
router.put("/:id", verifyToken, modifyEvent); 
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;