const express = require("express");

const router = express.Router();

const {
  startInterview,
  getInterviewHistory,
} = require("../controllers/interviewController");

const authMiddleware = require("../middleware/authMiddleware");

// Start Interview
router.post("/start", authMiddleware, startInterview);

// Get Interview History
router.get("/history", authMiddleware, getInterviewHistory);

module.exports = router;
