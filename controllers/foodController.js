const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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

const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find();
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "No foods items was found",
            });
        }

        res.status(200).send({
            success: true,
            totalCount: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all foods API",
            error,
        });
    }
};

const getSingleFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: "Please provide food ID",
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Not found food",
            });
        }

        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get single food API",
            error,
        });
    }
};

const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(500).send({
                success: false,
                message: "Please provide restaurant ID",
            });
        }

        const foods = await foodModel.find({ restaurant: restaurantId });
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "Not found food by this restaurant",
            });
        }

        res.status(200).send({
            success: true,
            message: "food base on restaurant",
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get single food API",
            error,
        });
    }
};

const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: "No food id was found",
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found",
            });
        }

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

        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            {
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
            },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Food item was updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update food API",
            error,
        });
    }
};

const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(500).send({
                success: false,
                message: "Please provide food ID",
            });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "No food found",
            });
        }

        await foodModel.findByIdAndDelete(foodId);

        res.status(200).send({
            success: true,
            message: "Food item was delete",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete food API",
            error,
        });
    }
};

const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "please provide food cart or payment method",
            });
        }

        let total = 0;
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        });

        await newOrder.save();

        res.status(201).send({
            success: true,
            message: "order placed successfully",
            newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in place order API",
            error,
        });
    }
};

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
};
