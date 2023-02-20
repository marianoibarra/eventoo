const { Router } = require("express");
require("dotenv").config();

const {
    getAllPaymentsMP,
    manageMercadoPagoResponse
} = require("../controllers/paymentMP")

const router = Router();

router.get("/", getAllPaymentsMP);
router.get("/:eventId", manageMercadoPagoResponse);

module.exports = router;