const express = require("express");
const router = express.Router();
const {
    addToCart,
    fetchCartItems,
    updateCartItemQuantity,
    deleteCartItem
} = require("../../controllers/shop/cart");

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;