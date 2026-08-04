const express = require("express");

const router = express.Router();

const { startInterview } = require("../controllers/interviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/start", authMiddleware, startInterview);

module.exports = router;
