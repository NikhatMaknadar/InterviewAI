const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get profile
router.get("/profile", authMiddleware, getProfile);

// Update profile — NAME ONLY
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
