const { Router } = require("express");
const {
  modifyEvent,
  deleteEvent,
  createEvent,
  getEventByUser,
  checkPrivatePassword,
  getAllPremiumEvents,
} = require("../controllers/event");

const { verifyToken} = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createEvent);
router.get("/checkPrivate", checkPrivatePassword);
router.get("/", verifyToken, getEventByUser);
router.put("/:id", verifyToken, modifyEvent); 
router.delete("/:id", verifyToken, deleteEvent);
router.get("/premium", getAllPremiumEvents)

module.exports = router;