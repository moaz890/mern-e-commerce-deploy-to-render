const Order = require("../../models/order")
const Product = require("../../models/product")
const ProductReview = require("../../models/review");


const addReview = async (req, res) => {
    try {
        const { userId, productId, review, rating, username} = req.body;
        const order = Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'confirmed'
        })

        if (!order) {
            return res.status(404).json({
                message: "Only who order this product can review it",
                success: false
            })
        }

        const checkExistingReview = await ProductReview.findOne({productId, userId});

        if(checkExistingReview) {
            return res.status(400).json({
                message: "You Already review this product before",
                success: false
            });
        }

        const newReview = new ProductReview({
            userId, productId, review, rating, username
        });
        
        await newReview.save();

        const reviews = await ProductReview.find({productId})
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewValue) => sum + reviewValue, 0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId, { averageReview });
        return res.status(201).json({
            success: true,
            data: newReview,
            message: "Successfully Add Review"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

const getReviews = async (req, res) => {
    try {
        const {productId} = req.params;
        
        const reviews = await ProductReview.find({ productId });

        return res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports = {
    addReview,
    getReviews
}