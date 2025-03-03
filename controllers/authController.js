const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone, answer } = req.body;

        if (!username || !email || !password || !address || !phone || !answer) {
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

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });

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

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
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

const logoutController = (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(404).send({
                success: false,
                message: "You are not authorized in more than one account",
            });
        }

        req.headers["authorization"] = undefined;

        res.status(200).send({
            success: true,
            message: "Logout successfully",
            token: req.headers["authorization"],
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in logout API",
            error,
        });
    }
};

module.exports = { registerController, loginController, logoutController };
