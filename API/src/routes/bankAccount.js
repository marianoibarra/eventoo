const { Router } = require("express");
const { modifyBankAccount, deleteBankAccount, createBankAccount, getBankAccount, } = require('../controllers/bankAccount');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createBankAccount);
router.get("/", verifyToken, getBankAccount);
router.put("/:id", verifyToken, modifyBankAccount);
router.delete("/:id", verifyToken, deleteBankAccount);

module.exports = router;
