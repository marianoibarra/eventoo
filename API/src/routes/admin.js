const { Router } = require("express");
const { getUsers,getCategories } = require("../controllers/admin");
const { verifyToken, verifyAdmins } = require("../controllers/user");

const router = Router();

router.get('/users', verifyToken, verifyAdmins, getUsers)
router.put("/categories/:id", verifyToken, verifyAdmins, getCategories);

module.exports = router;
