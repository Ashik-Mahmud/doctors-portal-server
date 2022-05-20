const router = require("express").Router();
const { createPayment } = require("../Controller/payment.controller.js");
const VerifyToken = require("../VerifyToken/VerifyToken.js");
/* post create booking */
router.post("/create-payments-intent", VerifyToken, createPayment)




module.exports = router;