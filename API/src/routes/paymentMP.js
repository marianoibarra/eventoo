const { Router } = require("express");
require("dotenv").config();

const {
    setMercadoPago,
    createPaymentMP,
    getAllPaymentsMP
} = require("../controllers/paymentMP")

const router = Router();

router.post("/", setMercadoPago);
router.post("/create", createPaymentMP);
router.get("/", getAllPaymentsMP);

module.exports = router;