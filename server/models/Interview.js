const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["HR", "Technical", "Mixed"],
      default: "Mixed",
    },

    questions: [
      {
        question: String,
        answer: String,
        feedback: {
          type: Object,
          default: {},
        },
        score: Number,
      },
    ],

    currentQuestionIndex: {
      type: Number,
      default: 0,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Interview", interviewSchema);
