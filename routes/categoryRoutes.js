const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    creareCategoryController,
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/create", authMiddleware, creareCategoryController);
router.get("/get-all", getAllCategoryController);
router.put("/update/:id", authMiddleware, updateCategoryController);
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
