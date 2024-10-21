const Feature = require("../../models/feature")


const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;

        const feature = new Feature({
            image: image
        })

        await feature.save();

        return res.status(201).json({
            success: true,
            message: "Success Add Feature"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getFeatureImages = async (req, res) => {
    try {
        const images = await Feature.find({});
        return res.status(201).json({
            success: true,
            data: images
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = { getFeatureImages, addFeatureImage }