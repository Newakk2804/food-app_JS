const express = require("express");
const {} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantById,
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/create", authMiddleware, createRestaurantController);
router.get("/get-all", getAllRestaurantController);
router.get("/get/:id", getRestaurantById);

module.exports = router;
