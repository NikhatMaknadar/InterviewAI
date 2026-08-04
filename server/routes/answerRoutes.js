const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { submitAnswer } = require("../controllers/answerController");

router.post("/", authMiddleware, submitAnswer);

module.exports = router;
