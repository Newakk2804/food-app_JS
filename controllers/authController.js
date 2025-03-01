const userModel = require("../models/userModel");

const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body;

        if (!username || !email || !password || !address || !phone) {
            return res.status(500).send({
                success: false,
                message: "Please provide all Fields",
            });
        }

        const existing = await userModel.findOne({ email });

        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email already registered, please Login",
            });
        }

        const user = await userModel.create({ username, email, password, address, phone });
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};

module.exports = { registerController };
