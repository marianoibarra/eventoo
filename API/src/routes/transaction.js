const { Router } = require("express");
const { createTransactions, getTransactionsByUser, getTransactionsByEvent, getTransactionsByEventOrganizer,updateTransaction,showTicketsByTransactionId } = require('../controllers/transactions');
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createTransactions);
router.get("/user", verifyToken, getTransactionsByUser)
router.get("/event/:id", verifyToken, getTransactionsByEvent)
router.get("/organizer/:id", verifyToken, getTransactionsByEventOrganizer)
router.put("/", verifyToken, updateTransaction)
router.get("/tickets",verifyToken,showTicketsByTransactionId)


module.exports = router;