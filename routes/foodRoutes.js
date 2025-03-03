const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/create", authMiddleware, createFoodController);
router.get("/get-all", getAllFoodsController);
router.get("/get/:id", getSingleFoodController);
router.get("/get-by-restaurant/:id", getFoodByRestaurantController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);

router.post("/place-order", authMiddleware, placeOrderController);
router.put("/order-status/:id", authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;
