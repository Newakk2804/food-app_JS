const express = require("express");
const {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, getUserController);
router.put("/update-user", authMiddleware, updateUserController);
router.put("/update-password", authMiddleware, updatePasswordController);
router.post("/reset-password", authMiddleware, resetPasswordController);

module.exports = router;
