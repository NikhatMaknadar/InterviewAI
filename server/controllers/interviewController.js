const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const { analyzeInterviewQuestions } = require("../services/interviewService");

// ===============================
// Start Interview
// ===============================
const startInterview = async (req, res) => {
  try {
    const { resumeId, interviewType } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (!resume.aiAnalysis) {
      return res.status(400).json({
        success: false,
        message: "Resume AI analysis is not available.",
      });
    }

    const questions = await analyzeInterviewQuestions(resume.aiAnalysis);

    const technicalQuestions = Array.isArray(questions.technical)
      ? questions.technical
      : [];

    const hrQuestions = Array.isArray(questions.hr) ? questions.hr : [];

    const codingQuestions = Array.isArray(questions.coding)
      ? questions.coding
      : [];

    const allQuestions = [
      ...technicalQuestions.map((q) => ({
        question: q,
        category: "Technical",
      })),

      ...hrQuestions.map((q) => ({
        question: q,
        category: "HR",
      })),

      ...codingQuestions.map((q) => ({
        question: q,
        category: "Coding",
      })),
    ];

    if (allQuestions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "No interview questions were generated.",
      });
    }

    const interview = await Interview.create({
      user: req.user.id,
      resume: resume._id,

      interviewType: interviewType || "Mixed",

      questions: allQuestions,
    });

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Start Interview Error:", error);

    // Gemini temporarily unavailable
    if (error.status === 503 || error.code === 503) {
      return res.status(503).json({
        success: false,
        message:
          "AI interview generation is temporarily unavailable because Gemini is experiencing high demand. Please try again in a few minutes.",
      });
    }

    // Gemini API quota exceeded
    if (error.status === 429 || error.code === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI interview generation is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to start interview.",
    });
  }
};

// ===============================
// Get user's interview history
// ===============================
const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .select("_id interviewType overallScore questions createdAt updatedAt");

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error("Interview History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview history",
    });
  }
};

module.exports = {
  startInterview,
  getInterviewHistory,
};
