import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { startInterview } from "../../services/interviewService";

function ResumeResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const [startingInterview, setStartingInterview] = useState(false);

  const resumeData = location.state?.resumeData;

  // Direct access protection
  if (!resumeData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl">
            📄
          </div>

          <h1 className="text-3xl font-bold mt-6">No Resume Analysis Found</h1>

          <p className="text-slate-400 mt-3">
            Upload your resume first to receive your AI-powered analysis and
            interview recommendations.
          </p>

          <button
            onClick={() => navigate("/resume")}
            className="ai-button mt-7 px-6 py-3"
          >
            Upload Resume
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  const analysis = resumeData.aiAnalysis || {};
  const resume = resumeData.resume || {};

  const atsScore = Number(analysis.atsScore) || 0;

  const scoreLabel =
    atsScore >= 80
      ? "Excellent"
      : atsScore >= 60
        ? "Good"
        : atsScore >= 40
          ? "Needs Improvement"
          : "Needs Work";

  const scoreColor =
    atsScore >= 80
      ? "text-emerald-400"
      : atsScore >= 60
        ? "text-blue-400"
        : atsScore >= 40
          ? "text-yellow-400"
          : "text-red-400";

  const handleStartInterview = async () => {
    if (!resume?._id) {
      toast.error("Resume ID not found.");
      return;
    }

    try {
      setStartingInterview(true);

      const response = await startInterview(resume._id, "Mixed");

      console.log("Interview Response:", response);

      toast.success("Interview started successfully!");

      navigate("/interview", {
        state: {
          interview: response.interview,
        },
      });
    } catch (error) {
      console.error("Start Interview Error:", error);

      toast.error(
        error.response?.data?.message || "Failed to start interview.",
      );
    } finally {
      setStartingInterview(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <span className="text-lg">←</span>
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-bold">AI</span>
              </div>

              <span className="text-xl font-bold">
                Interview<span className="text-blue-500">AI</span>
              </span>
            </button>

            <button
              onClick={() => navigate("/resume-management")}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
            >
              Resume Management
            </button>
            
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Page heading */}
        <section className="relative mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI Resume Analysis
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-5">
            Your resume
            <span className="text-blue-400"> analysis.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-3 max-w-3xl">
            AI-powered insights for{" "}
            <span className="text-slate-200 font-medium">
              {resume?.fileName || "your resume"}
            </span>
          </p>
        </section>

        {/* Score + Summary */}
        <section className="relative grid lg:grid-cols-[320px_1fr] gap-6 mb-7">
          {/* ATS Score */}
          <div className="ai-card p-7 flex flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-widest text-slate-500 font-semibold">
              ATS Score
            </p>

            <div className="relative w-44 h-44 mt-5">
              {/* Circle */}
              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.min(atsScore, 100) * 3.14} 314`}
                  className="text-blue-500"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold ${scoreColor}`}>
                  {atsScore}
                </span>

                <span className="text-xs text-slate-500">out of 100</span>
              </div>
            </div>

            <div className={`mt-3 font-semibold ${scoreColor}`}>
              {scoreLabel}
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Resume compatibility score
            </p>
          </div>

          {/* Analysis Summary */}
          <div className="ai-card p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">
                  Analysis overview
                </p>

                <h2 className="text-2xl font-bold mt-2">Resume Status</h2>
              </div>

              <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                ✓ Completed
              </div>
            </div>

            <p className="text-slate-400 mt-6 leading-relaxed">
              Your resume has been analyzed for ATS compatibility, strengths,
              weaknesses, skills, and interview readiness. Review the
              recommendations below before starting your AI interview.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-7">
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                <p className="text-xs text-slate-500">Strengths</p>

                <p className="text-2xl font-bold mt-1 text-emerald-400">
                  {analysis.strengths?.length || 0}
                </p>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                <p className="text-xs text-slate-500">Weaknesses</p>

                <p className="text-2xl font-bold mt-1 text-red-400">
                  {analysis.weaknesses?.length || 0}
                </p>
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                <p className="text-xs text-slate-500">Missing Skills</p>

                <p className="text-2xl font-bold mt-1 text-yellow-400">
                  {analysis.missingSkills?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strengths + Weaknesses */}
        <section className="grid lg:grid-cols-2 gap-6 mb-7">
          {/* Strengths */}
          <div className="ai-card p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                💪
              </div>

              <div>
                <h2 className="text-xl font-bold">Strengths</h2>

                <p className="text-sm text-slate-500">What's working well</p>
              </div>
            </div>

            <div className="space-y-3">
              {analysis.strengths?.length > 0 ? (
                analysis.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4"
                  >
                    <span className="text-emerald-400">✓</span>

                    <p className="text-slate-300 leading-relaxed">{strength}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No strengths available.</p>
              )}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="ai-card p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                ⚠️
              </div>

              <div>
                <h2 className="text-xl font-bold">Areas to Improve</h2>

                <p className="text-sm text-slate-500">
                  What you should work on
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {analysis.weaknesses?.length > 0 ? (
                analysis.weaknesses.map((weakness, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-red-500/5 border border-red-500/10 p-4"
                  >
                    <span className="text-red-400">!</span>

                    <p className="text-slate-300 leading-relaxed">{weakness}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No weaknesses available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Missing Skills */}
        <section className="ai-card p-7 mb-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              🧠
            </div>

            <div>
              <h2 className="text-xl font-bold">Missing Skills</h2>

              <p className="text-sm text-slate-500">
                Skills that could strengthen your profile
              </p>
            </div>
          </div>

          {analysis.missingSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {analysis.missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-yellow-500/5 border border-yellow-500/20 text-yellow-300 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No missing skills identified.</p>
          )}
        </section>

        {/* Interview Questions */}
        <section className="ai-card p-7 mb-7">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              🎯
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Personalized Interview Questions
              </h2>

              <p className="text-sm text-slate-500">
                Questions generated from your profile
              </p>
            </div>
          </div>

          {/* Technical */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-400">💻</span>

              <h3 className="font-semibold text-lg">Technical Questions</h3>
            </div>

            <div className="space-y-3">
              {analysis.technicalQuestions?.length > 0 ? (
                analysis.technicalQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl bg-slate-900 border border-slate-800 p-4 hover:border-blue-500/20 transition"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>

                    <p className="text-slate-300 leading-relaxed">{question}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No technical questions available.
                </p>
              )}
            </div>
          </div>

          {/* HR */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-purple-400">👥</span>

              <h3 className="font-semibold text-lg">HR Questions</h3>
            </div>

            <div className="space-y-3">
              {analysis.hrQuestions?.length > 0 ? (
                analysis.hrQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl bg-slate-900 border border-slate-800 p-4 hover:border-purple-500/20 transition"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>

                    <p className="text-slate-300 leading-relaxed">{question}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No HR questions available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="ai-card p-7 mb-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              🚀
            </div>

            <div>
              <h2 className="text-xl font-bold">Improvement Roadmap</h2>

              <p className="text-sm text-slate-500">Recommended next steps</p>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.roadmap?.length > 0 ? (
              analysis.roadmap.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/20 text-blue-400 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>

                  <div className="flex-1 rounded-xl bg-slate-900 border border-slate-800 p-4">
                    <p className="text-slate-300 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No roadmap available.</p>
            )}
          </div>
        </section>

        {/* Start Interview CTA */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 p-8 md:p-10 text-center">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
              🎤
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mt-5">
              Ready for your interview?
            </h2>

            <p className="max-w-2xl mx-auto text-slate-400 mt-3 leading-relaxed">
              Practice personalized technical and HR questions generated from
              your resume and receive AI-powered feedback after every answer.
            </p>

            <button
              onClick={handleStartInterview}
              disabled={startingInterview}
              className="ai-button mt-7 px-8 py-3.5"
            >
              {startingInterview ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Starting Interview...
                </>
              ) : (
                <>
                  Start AI Interview
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResumeResult;
