const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");
const bank_AccountMiddleware = require ("./bank_Account")

router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);
router.use("/bank_Account", bank_AccountMiddleware);


module.exports = router;