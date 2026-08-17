const fs = require("fs");
const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResume } = require("../services/geminiService");

const uploadResume = async (req, res) => {
  console.log(req.file);

  let resume = null;

  try {
    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload PDF",
      });
    }

    // Create resume record
    resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.path);

    resume.extractedText = extractedText;

    await resume.save();

    console.log("Starting Gemini resume analysis...");
    // Analyze resume using Gemini
    const aiAnalysis = await analyzeResume(extractedText);

    console.log("Gemini resume analysis completed.");
    // Save AI analysis
    resume.aiAnalysis = aiAnalysis;

    await resume.save();

    // Success response
    return res.status(201).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume,
      aiAnalysis,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    // Gemini API quota exceeded
    if (error.status === 429 || error.code === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI resume analysis is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later.",
      });
    }

    // Gemini temporarily unavailable
    if (error.status === 503 || error.code === 503) {
      // Delete resume record
      if (resume?._id) {
        await Resume.findByIdAndDelete(resume._id);
      }

      // Delete uploaded PDF
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(503).json({
        success: false,
        message:
          "AI resume analysis is temporarily unavailable because Gemini is experiencing high demand. Please try again in a few minutes.",
      });
    }
  }
};

// ===============================
// Get Current User's Resumes
// ===============================
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("Get Resumes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
    });
  }
};

// ===============================
// Delete Current User's Resume
// ===============================
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Delete the physical PDF file
    if (resume.filePath && fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    // Delete resume record from MongoDB
    await Resume.findByIdAndDelete(resume._id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};

module.exports = {
  uploadResume,
  getMyResumes,
  deleteResume,
};
