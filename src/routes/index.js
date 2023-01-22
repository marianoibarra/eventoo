const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");
const loginMiddleware = require("./login");

router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);
router.use("/login", loginMiddleware);

module.exports = router;

module.exports = router;
