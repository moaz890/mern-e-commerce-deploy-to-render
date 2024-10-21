const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const OrderSchema = new mogoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mogoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            price: String,
            image: String,
            salePrice: String,
            quantity: String,
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    amount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
    quantity: Number,
});

module.exports = mogoose.model('Order', OrderSchema);