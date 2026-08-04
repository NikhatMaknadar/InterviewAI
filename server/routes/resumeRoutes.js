const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");
const { uploadResume } = require("../controllers/resumeController");

router.post(
  "/upload",

  authMiddleware,

  upload.single("resume"),

  uploadResume,
);

module.exports = router;
