const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multer");
const {
  uploadResume,
  getMyResumes,
  deleteResume,
} = require("../controllers/resumeController");
router.get("/my-resumes", authMiddleware, getMyResumes);
router.delete("/:id", authMiddleware, deleteResume);
router.post(
  "/upload",

  authMiddleware,

  upload.single("resume"),

  uploadResume,
);

module.exports = router;
