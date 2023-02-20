const { Router } = require("express");
const {
  createTransactions,
  getTransactionsByUserBuyer,
  getTransactionById,
  cancelTransaction,
  completeTransaction,
  ApprovePayment,
  getTransactionsByEvent,
  getTransactionsByEventOrganizer,
  updateTransaction,
  showTicketsByTransactionId,
  getTransactionsByUserSeller
} = require("../controllers/transactions");
const { verifyToken } = require("../controllers/user");

const router = Router();

router.post("/", verifyToken, createTransactions);
router.get("/buyer", verifyToken, getTransactionsByUserBuyer);
router.get("/seller", verifyToken, getTransactionsByUserSeller);
router.get("/event/:id", verifyToken, getTransactionsByEvent);
router.put("/complete/:transactionId", verifyToken, completeTransaction);
router.put("/approvePayment/:transactionId", verifyToken, ApprovePayment);
router.put("/cancel/:transactionId", verifyToken, cancelTransaction);
router.get("/tickets", verifyToken, showTicketsByTransactionId);
router.get("/:id", verifyToken, getTransactionById);
// router.get("/organizer/:id", verifyToken, getTransactionsByEventOrganizer);
// router.put("/", verifyToken, updateTransaction);

module.exports = router;
