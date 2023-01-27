const { Router } = require("express");
const { modifyBackAccount, deleteBackAccount, createBackAccount, getBackAccount, } = require('../controllers/backAccount')

const router = Router();

router.get("/", getBackAccount);
router.post("/", createBackAccount);
router.put("/:id", modifyBackAccount);
router.delete("/:id", deleteBackAccount);

module.exports = router;
