const Interview = require("../models/Interview");
const { generateInterviewReport } = require("../services/reportService");

const getInterviewReport = async (req, res) => {
  try {
    const { interviewId } = req.params;

    // Find interview
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Check if interview is completed
    if (interview.currentQuestionIndex < interview.questions.length) {
      return res.status(400).json({
        success: false,
        message: "Please complete the interview before generating the report.",
      });
    }

    // Calculate score only for answered questions
    const answeredQuestions = interview.questions.filter(
      (q) => typeof q.score === "number",
    );

    const totalScore = answeredQuestions.reduce((sum, q) => sum + q.score, 0);

    const averageScore =
      answeredQuestions.length > 0
        ? Number((totalScore / answeredQuestions.length).toFixed(2))
        : 0;

    // Save overall score
    interview.overallScore = averageScore;
    await interview.save();

    // Generate AI report
    const report = await generateInterviewReport(interview);

    return res.status(200).json({
      success: true,
      overallScore: averageScore,
      report,
    });
  } catch (error) {
    console.error("Interview Report Error:", error);

    // Gemini quota / rate limit
    if (error.status === 429 || error.code === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI interview report is temporarily unavailable because the Gemini API quota has been exceeded. Please try again later.",
      });
    }

    // Gemini temporarily unavailable
    if (error.status === 503 || error.code === 503) {
      return res.status(503).json({
        success: false,
        message:
          "AI interview report is temporarily unavailable because Gemini is experiencing high demand. Please try again in a few minutes.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate interview report.",
    });
  }
};

module.exports = {
  getInterviewReport,
};
