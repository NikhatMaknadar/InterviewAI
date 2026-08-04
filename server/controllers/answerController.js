const Interview = require("../models/Interview");
const { evaluateAnswer } = require("../services/evaluateAnswerService");

const submitAnswer = async (req, res) => {
  try {
    const { interviewId, answer } = req.body;

    // Validate input
    if (!interviewId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide interviewId and answer",
      });
    }

    // Find interview
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Get current question automatically
    const index = interview.currentQuestionIndex;

    if (index >= interview.questions.length) {
      return res.status(200).json({
        success: true,
        message: "Interview already completed",
      });
    }

    const currentQuestion = interview.questions[index];

    // Evaluate answer using Gemini
    const result = await evaluateAnswer(currentQuestion.question, answer);

    // Save answer
    currentQuestion.answer = answer;

    // Save feedback
    currentQuestion.feedback = result;

    // Save score
    currentQuestion.score = result.score;

    // Move to next question
    interview.currentQuestionIndex += 1;

    await interview.save();

    // If interview completed
    if (interview.currentQuestionIndex >= interview.questions.length) {
      return res.status(200).json({
        success: true,
        completed: true,
        evaluation: result,
        message: "Interview Completed Successfully!",
      });
    }

    // Return next question
    const nextQuestion = interview.questions[interview.currentQuestionIndex];

    res.status(200).json({
      success: true,
      completed: false,
      evaluation: result,
      nextQuestion,
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
  submitAnswer,
};
