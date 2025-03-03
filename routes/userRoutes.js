const express = require("express");
const { getUserController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, getUserController);
router.put("/update-user", authMiddleware, updateUserController)

module.exports = router;
