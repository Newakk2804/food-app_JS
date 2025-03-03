const express = require("express");
const {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, getUserController);
router.put("/update-user", authMiddleware, updateUserController);
router.put("/update-password", authMiddleware, updatePasswordController);
router.post("/reset-password", authMiddleware, resetPasswordController);
router.delete("/delete-user/:id", authMiddleware, deleteProfileController);

module.exports = router;
