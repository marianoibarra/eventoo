const { Router } = require("express");
const {

  getUsers,
  changeBan,
  getCategories,
  changeRole,
  changeStatusEvent,
  getEvents,
  getAllReviews,
  modifyReview

} = require("../controllers/admin");
const {
  verifyToken,
  verifyAdmins,
  verifySuperAdmin,
} = require("../controllers/user");

const router = Router();

router.get("/users", verifyToken, verifyAdmins, getUsers);
router.put("/users/ban/:id", verifyToken, verifyAdmins, changeBan);
router.put("/users/change/:id", verifyToken, verifySuperAdmin, changeRole);
router.put("/categories/:id", verifyToken, verifyAdmins, getCategories);
router.put("/events/:id", verifyToken, verifyAdmins, changeStatusEvent);
router.get("/events", verifyToken, verifyAdmins, getEvents);
router.get("/reviews", verifyToken, verifyAdmins, getAllReviews)
router.put("/review/:reviewId",verifyToken, verifyAdmins, modifyReview )
module.exports = router;
