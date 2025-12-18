const Product = require("../../models/product");
const { imageUploadUtils } = require("../../../helpers/cloudinary");


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64")
        const url = "data:" + req.file.mimetype + ";base64," + b64; 
        const result = await imageUploadUtils(url);
        res.json({
            success: true,
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error Occured'
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        })
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product Added Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error Occured'
        })
    }
}

const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error Occured'
        })
    }
}

const editProduct = async (req, res) => {
    
    const { title, description, category, brand, price, salePrice, totalStock, image } = req.body;
    Product.find({_id: req.params.id})
    .exec()
    .then((data) => {

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            })
        }
        
        data[0].title = title;
        data[0].description = description;
        data[0].category = category;
        data[0].brand = brand;
        data[0].price = price;
        data[0].salePrice = salePrice;
        data[0].totalStock = totalStock;
        data[0].image = image;
        data[0].updatedAt = Date.now();

        data[0].save()
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
                message: 'Product Updated Successfully'
            })
        })
        .catch((err) => {
            console.log(err);
        })
        
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Error Occured'
        })
    })
    
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully'
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'Error Occured'
        })
    }
}

module.exports = {handleImageUpload, addProduct, fetchProducts, editProduct, deleteProduct};