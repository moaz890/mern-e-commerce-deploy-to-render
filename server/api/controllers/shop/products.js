const Product = require("../../models/product");


const getFilteredProducts = async (req, res) => {
    
    const { category = [], brand = [], sortBy='price-asc' } = req.query;

    let filters = {};
    if (category.length > 0) {
        filters.category = {
            $in: category.split(',')
        }
    }
    if (brand.length > 0) {
        filters.brand = {
            $in: brand.split(',')
        }
    }

    let sort = {};
    switch (sortBy) {
        case 'price-asc':
            sort = {
                price: 1
            }
            break;
        case 'price-desc':
            sort = {
                price: -1
            }
            break;
        case 'title-asc':
            sort = {
                title: 1
            }
            break;
        case 'title-desc':
            sort = {
                title: -1
            }
            break;
        default:
            sort = {
                price: 1
            }
            break;
    }

    Product.find(filters).sort(sort)
    .exec()
    .then((products) => {
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    })
    .catch ((error) => {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }) 
}


const getProductdetail = async (req, res) => {
    const { id } = req.params;
    Product.findById(id)
    .exec()
    .then((product) => {

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        })
    })
    .catch ((error) => {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    })
}

module.exports = {
    getFilteredProducts,
    getProductdetail
}