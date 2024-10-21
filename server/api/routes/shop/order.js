const express = require("express");
const router = express.Router();

const { createOrder, capturePayment, getAllOrdersByUserId, getOrdersDetails } = require("../../controllers/shop/order");

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUserId);
router.get("/details/:id", getOrdersDetails);

module.exports = router;