const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { creareCategoryController } = require("../controllers/categoryController");

const router = express.Router();

router.post("/create", authMiddleware, creareCategoryController);

module.exports = router;
