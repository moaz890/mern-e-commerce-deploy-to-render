const mongoose = require("mongoose");
const Order = require("../../models/order");
const order = require("../../models/order");

const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        const orders = await Order.find({ });

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

const getOrdersDetailsForAdmin = async (req, res) => {
    const userId = req.params.userId
    Order.findById(userId)
    .populate({path: "userId", select: "username email"})
    .exec()
    .then((order) => {
        
        if (!order) {
            return res.status(404).json({
                message: "Order Not Found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Order Fetched Successfully",
            success: true,
            data: order
        });
    }).catch((error) => {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    })
}

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const orders = await Order.findById(id);

        if (orders.length === 0) {
            return res.status(404).json({
                message: "No Orders Found",
                success: false
            });
        }

        await Order.findByIdAndUpdate(id, { orderStatus: orderStatus })
        
        
        return res.status(200).json({
            message: "Orders Fetched Successfully",
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = {
    getAllOrdersOfAllUsers,
    getOrdersDetailsForAdmin,
    updateOrderStatus
}