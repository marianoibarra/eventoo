const { Router } = require("express");
const { modifyEvent, deleteEvent, createEvent, getEvents, } = require('../controllers/event');
const {Category, Modality} = require('../db')
const categoryMock = require("../mocks/category");

const router = Router();

// router.get("/", getEvents);
router.get("/", async (req, res) => {
  try {
    const a = await Category.findAll({include: [ Modality ]})
    res.send(a)
    
  } catch (e) {
    res.status(400).send(e.message)
  }
  
});
router.post("/", createEvent);
router.put("/:id", modifyEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
