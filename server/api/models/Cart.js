const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, { timestamps: true})

CartSchema.statics.removeDeletedProduct = async function(productId) {
    await this.updateMany(
        { },
        { $pull: { items: { productId: productId } } }
    );
};


module.exports = mongoose.model("Cart", CartSchema);