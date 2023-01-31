const { Router } = require("express");
const { addFavorite, getFavorites, deleteFavorite } = require('../controllers/favorites');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, addFavorite);
router.get("/", verifyToken, getFavorites);
router.delete("/:id", verifyToken, deleteFavorite);

module.exports = router;
