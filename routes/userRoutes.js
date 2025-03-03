const express = require("express");
const { getUserController, updateUserController, updatePasswordController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, getUserController);
router.put("/update-user", authMiddleware, updateUserController);
router.put("/update-password", authMiddleware, updatePasswordController);

module.exports = router;
