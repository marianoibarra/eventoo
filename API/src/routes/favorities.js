const { Router } = require("express");
const { createFavorities, getFavorities, deleteFavorities} = require('../controllers/favorities');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createFavorities);
router.get("/", verifyToken, getFavorities);
router.delete("/:id", verifyToken, deleteFavorities);

module.exports = router;
