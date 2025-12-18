const mongoose = require('mongoose');
const paypal = require('../../../helpers/paypal');
const Order = require('../../models/order');
const Cart = require('../../models/Cart');
const Product = require("../../models/product");


const createOrder = async (req, res) => {
    try {
        const { userId, cartId, cartItems,
                addressInfo, orderStatus, paymentMethod,
                paymentStatus, amount, orderDate,
                orderUpdateDate, paymentId,
                payerId, quantity 
            } = req.body;
        
        const createPaymentJson = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel"
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        total: amount.toFixed(2),
                        currency: "USD"
                    },
                    description: "This is the payment description."
                }
            ]
        }

        paypal.payment.create(createPaymentJson, async (error, payment) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    success: false
                })
            }

            const newOrder = new Order({
                _id: new mongoose.Types.ObjectId(),
                userId,
                cartId,
                cartItems,
                addressInfo,
                orderStatus,
                paymentMethod,
                paymentStatus,
                amount,
                orderDate,
                orderUpdateDate,
                paymentId,
                payerId,
                quantity
            })
            
            await newOrder.save();
            const approvalURL = payment.links.find(link => link.rel === 'approval_url').href;
            res.status(201).json({
                message: "Order Created Successfully",
                success: true,
                approvalURL,
                orderId: newOrder._id
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, orderId, payerId } = req.body       
        let order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                message: "Order Not Found",
                success: false
            });
        }
        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for (let item of order.cartItems) {
            let product = await Product.findById(item.productId);
            if (!product) res.status(404).json({success: false, message: "Not Enough Stock For This Product"});
            product.totalStock -= item.quantity;
            await product.save();
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);
        await order.save();

        return res.status(200).json({
            message: "Payment Captured Successfully",
            success: true
        })
    } catch (error) {
        
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const getAllOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });

        if (orders.length === 0) {
            return res.status(404).json({
                message: "No Orders Found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Orders Fetched Successfully",
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const getOrdersDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Orders Fetched Successfully",
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = {
    createOrder,
    capturePayment,
    getAllOrdersByUserId,
    getOrdersDetails
}