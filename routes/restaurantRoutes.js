const express = require("express");
const {} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();

router.post("/create", authMiddleware, createRestaurantController);

module.exports = router;
