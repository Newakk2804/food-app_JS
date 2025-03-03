const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;
        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });
        await newFood.save();

        res.status(201).send({
            success: true,
            message: "new food item created",
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create food API",
            error,
        });
    }
};

module.exports = { createFoodController };
