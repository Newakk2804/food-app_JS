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

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide email or password",
            });
        }

        const user = await userModel.findOne({ email: email, password: password });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found or password misMatch",
            });
        }

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        });
    }
};

module.exports = { registerController, loginController };
