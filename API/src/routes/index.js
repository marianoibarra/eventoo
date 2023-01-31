const router = require("express").Router();
const userMiddleware = require("./user");
const eventMiddleware = require("./event");
const bankAccountMiddleware = require ("./bankAccount")
const homeMiddleware = require("./home")
const favoritesMiddelewere = require("./favorites")

router.use("/user", userMiddleware);
router.use("/event", eventMiddleware);
router.use("/bank-account", bankAccountMiddleware);
router.use("/home", homeMiddleware)
router.use("/favorities", favoritesMiddelewere);

module.exports = router;