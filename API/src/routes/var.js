const { Router } = require("express");
const { sendConfig } = require("../controllers/transactions");

const router = Router();

router.get("/");
router.get("/", (req, res) => {
    const variables = {sendConfig};
    res.json(variables);
  });
  
  module.exports = router;
