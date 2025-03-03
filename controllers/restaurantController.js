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

const getAllRestaurantController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find();
        if (!restaurants) {
            return res.status(404).send({
                success: false,
                message: "Not restaurants available",
            });
        }

        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all restaurant API",
            error,
        });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide restaurant ID",
            });
        }

        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Not found restaurant",
            });
        }

        res.status(200).send({
            success: true,
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get restaurant by id API",
            error,
        });
    }
};

const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide restaurant ID",
            });
        }

        await restaurantModel.findByIdAndDelete(restaurantId);

        res.status(200).send({
            success: true,
            message: "Restaurant deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete restaurant API",
            error,
        });
    }
};

module.exports = {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantById,
    deleteRestaurantController,
};
