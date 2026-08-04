const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const { analyzeInterviewQuestions } = require("../services/interviewService");

const startInterview = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,

        message: "Resume not found",
      });
    }

    const questions = await analyzeInterviewQuestions(resume.aiAnalysis);

    const interview = await Interview.create({
      user: req.user.id,

      resume: resume._id,

      questions: [
        ...questions.technical.map((q) => ({
          question: q,
        })),

        ...questions.hr.map((q) => ({
          question: q,
        })),
      ],
    });

    res.status(200).json({
      success: true,

      interview,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

module.exports = {
  startInterview,
};
