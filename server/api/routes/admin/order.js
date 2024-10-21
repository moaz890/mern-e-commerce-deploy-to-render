const express = require("express");
const { getAllOrdersOfAllUsers, getOrdersDetailsForAdmin, updateOrderStatus } = require("../../controllers/admin/order");
const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:userId", getOrdersDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);


module.exports = router;