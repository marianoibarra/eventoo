const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");
const bankAccountMiddleware = require ("./bankAccount")
const homeMiddleware=require("./home")

router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);
router.use("/bank-account", bankAccountMiddleware);
router.use("/home", homeMiddleware)


module.exports = router;