const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");


router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);

module.exports = router;