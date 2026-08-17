import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getInterviewHistory } from "../../services/interviewService";

function History() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // =================================
  // Fetch Interview History
  // =================================
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await getInterviewHistory();

        console.log("Interview History Response:", response);

        setInterviews(response.interviews || []);
      } catch (error) {
        console.error("Interview History Error:", error);

        toast.error(
          error.response?.data?.message || "Failed to load interview history.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // =================================
  // Loading
  // =================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

          <p className="text-slate-400 mt-4">Loading interview history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Back to Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <span className="text-lg">←</span>

              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>

            {/* Logo */}
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
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        {/* Page Heading */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Interview History
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-5">
            Your interview
            <span className="text-blue-400"> journey.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-3 max-w-2xl">
            Review your previous AI interviews, scores, and performance reports.
          </p>
        </section>

        {/* No Interviews */}
        {interviews.length === 0 ? (
          <section className="ai-card p-10 md:p-14 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-4xl">
              🎤
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mt-6">
              No interviews yet
            </h2>

            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              You haven't completed any interviews yet. Start your first
              AI-powered interview and your performance will appear here.
            </p>

            <button
              onClick={() => navigate("/resume-management")}
              className="ai-button mt-7 px-6 py-3.5"
            >
              Start Your First Interview
              <span>→</span>
            </button>
          </section>
        ) : (
          <>
            {/* Summary */}
            <section className="grid sm:grid-cols-3 gap-5 mb-8">
              {/* Total Interviews */}
              <div className="ai-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total Interviews</p>

                    <h2 className="text-3xl font-bold mt-2">
                      {interviews.length}
                    </h2>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    🎤
                  </div>
                </div>
              </div>

              {/* Average Score */}
              <div className="ai-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Average Score</p>

                    <h2 className="text-3xl font-bold mt-2">
                      {(
                        interviews.reduce(
                          (sum, interview) =>
                            sum + (interview.overallScore || 0),
                          0,
                        ) / interviews.length
                      ).toFixed(1)}
                      <span className="text-base text-slate-500"> /10</span>
                    </h2>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    📈
                  </div>
                </div>
              </div>

              {/* Best Score */}
              <div className="ai-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Best Score</p>

                    <h2 className="text-3xl font-bold mt-2">
                      {Math.max(
                        ...interviews.map(
                          (interview) => interview.overallScore || 0,
                        ),
                      ).toFixed(1)}
                      <span className="text-base text-slate-500"> /10</span>
                    </h2>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    🏆
                  </div>
                </div>
              </div>
            </section>

            {/* Interview List */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold">Recent Interviews</h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Your latest interview attempts
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {interviews.map((interview) => {
                  const questionCount = interview.questions?.length || 0;

                  const score = interview.overallScore ?? 0;

                  const formattedDate = new Date(
                    interview.createdAt,
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <div key={interview._id} className="ai-card p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        {/* Interview Information */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                            🎤
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold">
                              {interview.interviewType || "Mixed"} Interview
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                              Completed on {formattedDate}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">
                                {questionCount} Questions
                              </span>

                              <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                                Completed
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Score + Button */}
                        <div className="flex items-center justify-between md:justify-end gap-6">
                          <div className="text-right">
                            <p className="text-xs text-slate-500">Score</p>

                            <p className="text-2xl font-bold text-blue-400">
                              {score.toFixed(1)}
                              <span className="text-sm text-slate-500">
                                /10
                              </span>
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              navigate("/interview-report", {
                                state: {
                                  interviewId: interview._id,
                                },
                              })
                            }
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium transition"
                          >
                            View Report →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default History;
