import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import InterviewHeader from "../../components/interview/InterviewHeader";
import InterviewProgress from "../../components/interview/InterviewProgress";
import InterviewQuestion from "../../components/interview/InterviewQuestion";
import AnswerBox from "../../components/interview/AnswerBox";

import { submitAnswer } from "../../services/interviewService";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();

  const interview = location.state?.interview;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Interview data missing
  if (!interview) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl">
            🎤
          </div>

          <h1 className="text-3xl font-bold mt-6">Interview Not Found</h1>

          <p className="text-slate-400 mt-3">
            Please start a new interview from your resume analysis page.
          </p>

          <button
            onClick={() => navigate("/resume-management")}
            className="ai-button mt-7 px-6 py-3"
          >
            Start New Interview
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  const questions = interview.questions || [];

  const currentQuestion = questions[currentQuestionIndex];

  const totalQuestions = questions.length;

  // Submit answer
  const handleSubmitAnswer = async () => {
    if (loading) {
      return;
    }
    if (!answer.trim()) {
      toast.error("Please enter your answer.");
      return;
    }

    if (!currentQuestion?._id) {
      toast.error("Question ID not found.");
      return;
    }

    try {
      setLoading(true);

      const response = await submitAnswer(
        interview._id,
        currentQuestion._id,
        answer,
      );

      console.log("Answer Response:", response);

      if (response.completed) {
        setEvaluation(response.evaluation);

        toast.success("Interview completed successfully!");

        setTimeout(() => {
          navigate("/interview-report", {
            state: {
              interviewId: interview._id,
            },
          });
        }, 500);
      } else {
        setEvaluation(response.evaluation);
        toast.success("Answer evaluated successfully!");
      }
    } catch (error) {
      console.error("Submit Answer Error:", error);

      toast.error(error.response?.data?.message || "Failed to submit answer.");
    } finally {
      setLoading(false);
    }
  };

  // Next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      setAnswer("");
      setEvaluation(null);
    } else {
      navigate("/interview-report", {
        state: {
          interviewId: interview._id,
        },
      });
    }
  };

  // Exit interview
  const handleExit = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the interview?",
    );

    if (confirmExit) {
      navigate("/resume-management");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <InterviewHeader
        interviewType={interview.interviewType}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        onExit={handleExit}
      />

      {/* Main */}
      <main className="relative max-w-5xl mx-auto px-6 py-8 md:py-12">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Interview intro */}
        <section className="relative mb-7">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Live AI Interview
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4">
                Show what you know.
              </h1>

              <p className="text-slate-400 mt-2">
                Take your time, explain your thinking, and answer naturally.
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Question
              </p>

              <p className="text-2xl font-bold mt-1">
                {currentQuestionIndex + 1}
                <span className="text-slate-600"> / {totalQuestions}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="relative ai-card p-5 mb-7">
          <InterviewProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
        </section>

        {/* Question */}
        <section className="relative ai-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
              🤖
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
                Interview Question
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Question {currentQuestionIndex + 1}
              </p>
            </div>
          </div>

          <InterviewQuestion question={currentQuestion?.question} />
        </section>

        {/* Answer */}
        {!evaluation && (
          <section className="relative mt-6">
            <div className="ai-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold">Your Answer</h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Explain your answer clearly and confidently.
                  </p>
                </div>

                <span className="hidden sm:block text-xs text-slate-600">
                  AI will evaluate your response
                </span>
              </div>

              <AnswerBox
                answer={answer}
                setAnswer={setAnswer}
                onSubmit={handleSubmitAnswer}
                loading={loading}
              />
            </div>

            {/* AI evaluating */}
            {loading && (
              <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      AI is evaluating your answer...
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Analyzing your response and preparing personalized
                      feedback.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Evaluation */}
        {evaluation && (
          <section className="relative mt-6">
            <div className="ai-card overflow-hidden">
              {/* Evaluation Header */}
              <div className="p-7 md:p-8 border-b border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />

                      <span className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
                        AI Evaluation
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mt-3">
                      Here's how you performed
                    </h2>
                  </div>

                  {/* Score */}
                  <div className="text-center sm:text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                      Score
                    </p>

                    <p className="text-5xl font-extrabold text-blue-400 mt-1">
                      {evaluation.score ?? 0}

                      <span className="text-2xl text-slate-500">/10</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Evaluation Content */}
              <div className="p-7 md:p-8">
                {/* Strengths */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-bold">Strengths</h3>

                      <p className="text-xs text-slate-500">
                        What you did well
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {evaluation.strengths?.length > 0 ? (
                      evaluation.strengths.map((strength, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4"
                        >
                          <p className="text-slate-300">{strength}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">No strengths provided.</p>
                    )}
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      !
                    </div>

                    <div>
                      <h3 className="font-bold">Areas to Improve</h3>

                      <p className="text-xs text-slate-500">
                        Where you can improve
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {evaluation.weaknesses?.length > 0 ? (
                      evaluation.weaknesses.map((weakness, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-red-500/5 border border-red-500/10 p-4"
                        >
                          <p className="text-slate-300">{weakness}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">No weaknesses provided.</p>
                    )}
                  </div>
                </div>

                {/* Correct Answer */}
                {evaluation.correctAnswer && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        📖
                      </div>

                      <div>
                        <h3 className="font-bold">Ideal Answer</h3>

                        <p className="text-xs text-slate-500">
                          A stronger way to answer
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-blue-500/5 border border-blue-500/10 p-5">
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {evaluation.correctAnswer}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                      💡
                    </div>

                    <div>
                      <h3 className="font-bold">Interview Tips</h3>

                      <p className="text-xs text-slate-500">
                        Keep these in mind
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {evaluation.tips?.length > 0 ? (
                      evaluation.tips.map((tip, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-yellow-500/5 border border-yellow-500/10 p-4"
                        >
                          <p className="text-slate-300">{tip}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500">No tips provided.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Next */}
              <div className="p-6 md:p-7 border-t border-slate-800 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="ai-button px-7 py-3"
                >
                  {currentQuestionIndex < totalQuestions - 1
                    ? "Next Question"
                    : "Finish Interview"}

                  <span>→</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Interview;
