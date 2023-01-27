const { Router } = require("express");
const { modifyBank_Account, deleteBank_Account, createBank_Account, getBank_Account, } = require('../controllers/bank_Account');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createBank_Account);
router.get("/", verifyToken, getBank_Account);
router.put("/", verifyToken, modifyBank_Account);
router.delete("/", verifyToken, deleteBank_Account);

module.exports = router;
