const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");
const bankAccountMiddleware = require ("./bankAccount")

router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);
router.use("/bank_Account", bankAccountMiddleware);


module.exports = router;