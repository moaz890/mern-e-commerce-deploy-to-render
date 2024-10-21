const express = require("express");
const { getFilteredProducts, getProductdetail } = require("../../controllers/shop/products");
 
const router = express.Router();


router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductdetail);

module.exports = router;