import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getInterviewReport } from "../../services/interviewService";

function InterviewReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const interviewId = location.state?.interviewId;

  const [report, setReport] = useState(null);
  const [overallScore, setOverallScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (!interviewId) {
        setLoading(false);
        return;
      }

      try {
        const response = await getInterviewReport(interviewId);

        console.log("Interview Report Response:", response);

        setOverallScore(response.overallScore ?? 0);
        setReport(response.report);
      } catch (error) {
        console.error("Interview Report Error:", error);

        setError(true);

        toast.error(
          error.response?.data?.message || "Failed to load interview report.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [interviewId]);

  // No interview ID
  if (!interviewId) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl">
            📊
          </div>

          <h1 className="text-3xl font-bold mt-6">
            Interview Report Not Found
          </h1>

          <p className="text-slate-400 mt-3">
            Please complete an interview first to generate your performance
            report.
          </p>

          <button
            onClick={() => navigate("/resume-management")}
            className="ai-button mt-7 px-6 py-3"
          >
            Go to Dashboard
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
          </div>

          <h2 className="text-xl font-semibold mt-6">
            Generating your interview report...
          </h2>

          <p className="text-slate-400 mt-2">
            AI is analyzing your overall performance.
          </p>

          <p className="text-xs text-slate-600 mt-4">
            Please don't close this page.
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">
            ⚠️
          </div>

          <h1 className="text-3xl font-bold mt-6">Unable to Load Report</h1>

          <p className="text-slate-400 mt-3">
            We couldn't load your interview report. Please try again.
          </p>

          <button
            onClick={() => navigate("/history")}
            className="ai-button mt-7 px-6 py-3"
          >
            Back to History
            <span>→</span>
          </button>
        </div>
      </div>
    );
  }

  const score = Number(overallScore) || 0;

  const performance =
    report?.overallPerformance ||
    (score >= 8
      ? "Excellent"
      : score >= 6
        ? "Good"
        : score >= 4
          ? "Average"
          : "Needs Improvement");

  const scoreColor =
    score >= 8
      ? "text-emerald-400"
      : score >= 6
        ? "text-blue-400"
        : score >= 4
          ? "text-yellow-400"
          : "text-red-400";

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
              onClick={() => navigate("/profile")}
              className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition"
            >
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-6xl mx-auto px-6 py-10 md:py-14">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero */}
        <section className="relative text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Interview Completed
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-5">
            Your interview
            <span className="text-blue-400"> report.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-3 max-w-2xl mx-auto">
            Review your performance, understand your strengths, and see exactly
            what you should improve next.
          </p>
        </section>

        {/* Score */}
        <section className="relative ai-card p-8 md:p-10 mb-7">
          <div className="grid md:grid-cols-[260px_1fr] items-center gap-8">
            {/* Score Circle */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 120 120">
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
                    strokeDasharray={`${Math.min(score, 10) * 31.4} 314`}
                    className="text-blue-500"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-extrabold ${scoreColor}`}>
                    {score}
                  </span>

                  <span className="text-sm text-slate-500">out of 10</span>
                </div>
              </div>
            </div>

            {/* Score information */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                Overall Performance
              </p>

              <h2
                className={`text-3xl md:text-4xl font-bold mt-2 ${scoreColor}`}
              >
                {performance}
              </h2>

              <p className="text-slate-400 mt-4 leading-relaxed max-w-2xl">
                Your overall score is based on the quality, accuracy, and
                relevance of your answers throughout the interview.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-500">Overall Score</p>

                  <p className="font-semibold mt-1">{score}/10</p>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-500">Status</p>

                  <p className="font-semibold text-emerald-400 mt-1">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        {report?.summary && (
          <section className="ai-card p-7 md:p-8 mb-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                📋
              </div>

              <div>
                <h2 className="text-xl font-bold">Interview Summary</h2>

                <p className="text-sm text-slate-500">
                  AI assessment of your interview
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
              <p className="text-slate-300 leading-relaxed">{report.summary}</p>
            </div>
          </section>
        )}

        {/* Strengths & Weaknesses */}
        <section className="grid lg:grid-cols-2 gap-6 mb-7">
          {/* Strengths */}
          <div className="ai-card p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                💪
              </div>

              <div>
                <h2 className="text-xl font-bold">Strengths</h2>

                <p className="text-sm text-slate-500">What you did well</p>
              </div>
            </div>

            <div className="space-y-3">
              {report?.strengths?.length > 0 ? (
                report.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4"
                  >
                    <span className="text-emerald-400 shrink-0">✓</span>

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
                  What you should focus on
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {report?.weaknesses?.length > 0 ? (
                report.weaknesses.map((weakness, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-red-500/5 border border-red-500/10 p-4"
                  >
                    <span className="text-red-400 shrink-0">!</span>

                    <p className="text-slate-300 leading-relaxed">{weakness}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">No weaknesses available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="ai-card p-7 md:p-8 mb-7">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              🚀
            </div>

            <div>
              <h2 className="text-xl font-bold">Improvement Roadmap</h2>

              <p className="text-sm text-slate-500">
                Your recommended next steps
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {report?.roadmap?.length > 0 ? (
              report.roadmap.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    {String(index + 1).padStart(2, "0")}
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

        {/* Recommended Resources */}
        <section className="ai-card p-7 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              📚
            </div>

            <div>
              <h2 className="text-xl font-bold">Recommended Resources</h2>

              <p className="text-sm text-slate-500">
                Resources to help you improve
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {report?.recommendedResources?.length > 0 ? (
              report.recommendedResources.map((resource, index) => (
                <div
                  key={index}
                  className="group rounded-xl bg-slate-900 border border-slate-800 p-5 hover:border-purple-500/30 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>

                    <p className="text-slate-300 leading-relaxed">{resource}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500">
                No recommended resources available.
              </p>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 p-8 md:p-10 text-center">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
              🎤
            </div>

            <h2 className="text-3xl font-bold mt-5">Ready to improve?</h2>

            <p className="text-slate-400 mt-3 max-w-xl mx-auto">
              Use your feedback to prepare and take another personalized AI
              interview.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
              <button
                onClick={() => navigate("/resume-management")}
                className="ai-button px-7 py-3"
              >
                Start New Interview
                <span>→</span>
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-7 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition font-semibold"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default InterviewReport;
