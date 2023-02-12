const { Router } = require("express");
const {
  getUsers,
  changeBan,
  getCategories,
  changeRole,
} = require("../controllers/admin");
const { verifyToken, verifyAdmins } = require("../controllers/user");

const router = Router();

router.get("/users", verifyToken, verifyAdmins, getUsers);
router.put("/users/ban/:id", verifyToken, verifyAdmins, changeBan);
router.put("/users/admin/:id", verifyToken, verifyAdmins, changeRole);
router.put("/categories/:id", verifyToken, verifyAdmins, getCategories);

module.exports = router;
