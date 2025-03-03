const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/create", authMiddleware, createFoodController);
router.get("/get-all", getAllFoodsController);
router.get("/get/:id", getSingleFoodController);
router.get("/get-by-restaurant/:id", getFoodByRestaurantController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);

router.post("/place-order", authMiddleware, placeOrderController);

module.exports = router;
