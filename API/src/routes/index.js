const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");
const bankAccountMiddleware = require("./bankAccount");
const homeMiddleware = require("./home");
const favoritesMiddleware = require("./favorites");
const reviewsMiddleware = require("./reviews");
const transactionMiddleware = require("./transaction");
const adminMiddleware = require("./admin");

router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);
router.use("/bank-account", bankAccountMiddleware);
router.use("/home", homeMiddleware);
router.use("/favorites", favoritesMiddleware);
router.use("/reviews", reviewsMiddleware);
router.use("/transaction", transactionMiddleware);
router.use("/admin", adminMiddleware);

module.exports = router;
