const Cart = require("../../models/Cart");
const Product = require("../../models/product");


const addToCart = async (req, res) => {

    try {
        const { userId, productId, quantity} = req.body;  

        if(!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data Provided"
            })
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({
            message: "Product Not Found",
            success: false
        })

        let cart = await Cart.findOne({userId});
        if(!cart) {
            cart = new Cart({
                userId, items: []
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            cart.items.push({productId, quantity});
        }else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();

        return res.status(201).json({
            success: true,
            data: cart
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

const fetchCartItems = async (req, res) => {

    try {
        const { userId } = req.params;
        if (!userId) return res.status(500).json({
            success: false,
            message: "User id is mandatory"
        })

        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: cart.items
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const updateCartItemQuantity = async (req, res) => {

    try {
        const { userId, productId, quantity} = req.body  

        if(!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data Provided"
            })
        }

        const cart = await Cart.findOne({userId});

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        const populateCartItems = cart.items.map(item => {
            return {
                ...item.productId._doc,
                quantity: item.quantity
            }
        });

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const deleteCartItem = async (req, res) => {

    try {
        const { userId, productId } = req.params  

        if(!userId || !productId ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Data Provided"
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice"
        });

        const populateCartItems = cart.items.map(item => {
            return {
                ...item.productId._doc,
                quantity: item.quantity
            }
        });
        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}


module.exports = { addToCart, fetchCartItems, deleteCartItem, updateCartItemQuantity}