const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getInterviewReport } = require("../controllers/reportController");

router.get("/:interviewId", authMiddleware, getInterviewReport);

module.exports = router;
