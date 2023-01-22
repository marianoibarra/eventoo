const { Router } = require("express");
const { login } = require("../controllers/login");

const router = Router();

router.post("/", login);

module.exports = router;