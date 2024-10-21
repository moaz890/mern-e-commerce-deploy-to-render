const Prodcut = require("../../models/product");

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid keyword"
            })
        }

        const regex = new RegExp(keyword, "i");
        const createSearchQuery = {
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } },
                { brand: { $regex: regex } },
            ]
        }

        const products = await Prodcut.find(createSearchQuery);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    searchProducts
}