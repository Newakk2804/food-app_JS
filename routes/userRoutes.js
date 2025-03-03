const express = require("express");
const { getUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get-user", authMiddleware, getUserController);

module.exports = router;
