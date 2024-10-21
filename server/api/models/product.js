const mongoose = require("mongoose");
const Cart = require("./Cart");

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number
}, {timestamps:true});

ProductSchema.pre('remove', async function(next) {
    const productId = this._id;
    await Cart.removeDeletedProduct(productId);
    next();
});

module.exports = mongoose.model("Product", ProductSchema);