const { Router } = require("express");
require("dotenv").config();

const {
    setMercadoPago,
    createPaymentMP,
    getAllPaymentsMP
} = require("../controllers/paymentMP")

const router = Router();

router.post("/create", createPaymentMP);
router.post("/:eventId", setMercadoPago);
router.get("/", getAllPaymentsMP);

module.exports = router;