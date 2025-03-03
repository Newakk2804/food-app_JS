const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantById,
    deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/create", authMiddleware, createRestaurantController);
router.get("/get-all", getAllRestaurantController);
router.get("/get/:id", getRestaurantById);
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
