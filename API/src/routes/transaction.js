const { Router } = require("express");
const { createTransactions, getTransactionsByUser, getTransactionsByEvent, getTransactionsByEventOrganizer,updateTransaction } = require('../controllers/transactions');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createTransactions);
router.get("/user", verifyToken, getTransactionsByUser)
router.get("/event", verifyToken, getTransactionsByEvent)
router.get("/organizer", verifyToken, getTransactionsByEventOrganizer)
router.put("/", verifyToken, updateTransaction)


module.exports = router;