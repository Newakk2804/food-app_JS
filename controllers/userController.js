const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Not found user",
            });
        }

        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User get successfully",
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in get user API",
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Not found user",
            });
        }

        const { username, address, phone } = req.body;
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();

        res.status(200).send({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update user API",
            error,
        });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Not found user",
            });
        }

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide old and new password",
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Update password successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update password",
            error,
        });
    }
};

module.exports = { getUserController, updateUserController, updatePasswordController };
