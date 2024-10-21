const express = require("express");
const { addReview, getReviews } = require("../../controllers/shop/productReview");
 
const router = express.Router();


router.post("/add", addReview);
router.get("/get/:productId", getReviews);

module.exports = router;