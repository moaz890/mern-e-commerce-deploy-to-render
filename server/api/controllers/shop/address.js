const Address = require("../../models/address");

const addAddress = async (req, res) => {

    try {
        const { userId, address, city, pincode, phone, notes } = req.body;
        if (!userId || !address || !city || !pincode || !phone) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            })
        }

        const newAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })

        await newAddress.save();

        res.status(201).json({
            message: "Address added successfully",
            success: true,
            data: newAddress
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

}
const fetchAllAddress = async (req, res) => {

    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                message: "Please provide user id",
                success: false
            })
        }
        const addresses = await Address.find({ userId });
        res.status(200).json({
            message: "Addresses fetched successfully",
            success: true,
            data: addresses
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

}

const editAddress = async (req, res) => {

    try {
        const  { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.status(400).json({
                message: "Please provide user id and address id",
                success: false
            })
        }

        const address = await Address.findOneAndUpdate({_id: addressId, userId}, req.body, {new: true});

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Address updated successfully",
            success: true,
            data: address
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

}

const deleteAddress = async (req, res) => {

    try {
        const  { userId, addressId } = req.params;
        
        if (!userId || !addressId) {
            return res.status(400).json({
                message: "Please provide user id and address id",
                success: false
            })
        }

        const address = await Address.findOneAndDelete({_id: addressId, userId});
        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                success: false
            })
        }
        res.status(200).json({
            message: "Address deleted successfully",
            success: true,
            data: address
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

}


module.exports = { addAddress, editAddress, deleteAddress, fetchAllAddress}