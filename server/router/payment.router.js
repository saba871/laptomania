const express = require("express");
const { createCheckoutSession } = require("../controller/payment.controller");
const protect = require("../middleware/auth.middleware");

const paymentRouter = express.Router();


paymentRouter.post("/:productID", protect, createCheckoutSession);



module.exports = paymentRouter
