const { Router } = require("express");
const { getCategories } = require("../controllers/admin");
const { verifyToken, verifyAdmins } = require("../controllers/user");

const router = Router();

router.put("/categories/:id", verifyToken, verifyAdmins, getCategories);

module.exports = router;
