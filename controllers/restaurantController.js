const restaurantModel = require("../models/restaurantModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "please provide title and address",
            });
        }

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "Create new restaurant successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create restaurant API",
            error,
        });
    }
};

module.exports = { createRestaurantController };
