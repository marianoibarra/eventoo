const { Router } = require("express");
const { createUser } = require("../controllers/createUser");
const { forgot } = require("../controllers/forgot");
const { modifyData } = require("../controllers/modifyData");

const router = Router();

router.post("/", createUser);
router.post("/recoverypassword", forgot);
router.put("/:id", modifyData);

module.exports = router;
