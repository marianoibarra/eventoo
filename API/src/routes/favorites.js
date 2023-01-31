const { Router } = require("express");
const { createFavorite, getFavorites, deleteFavorite } = require('../controllers/favorites');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createFavorite);
router.get("/", verifyToken, getFavorites);
router.delete("/:id", verifyToken, deleteFavorite);

module.exports = router;
