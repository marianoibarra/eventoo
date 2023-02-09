const { Router } = require("express");
const {
  register,
  login,
  verifyToken,
  test,
  resetPassword,
  forgotPassword,
  checkResetToken,
  changePassword,
  verifyEmailCode,
  resendEmailCode,
  modifyUser,
  verifySuperAdmin,
  changeRole,
  googleAuth,
} = require("../controllers/user");

const router = Router();

router.post("/register", register);
router.post("/auth", googleAuth);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:reset_token", checkResetToken);
router.put("/reset-password", resetPassword);
router.put("/change-password", verifyToken, changePassword);
router.post("/verify-email", verifyToken, verifyEmailCode);
router.post("/verify-email/resend", verifyToken, resendEmailCode);
router.put("/", verifyToken, modifyUser);
router.put("/:id", verifyToken, verifySuperAdmin, changeRole)


//probar token login
router.get("/test-token", test);

module.exports = router;
