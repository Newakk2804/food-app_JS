const userModel = require("../models/userModel");

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

module.exports = { getUserController, updateUserController };
