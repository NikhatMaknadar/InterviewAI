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

    res.status(200).json({
      success: true,
      overallScore: averageScore,
      report,
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
  getInterviewReport,
};
