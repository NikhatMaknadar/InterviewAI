import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useAuth } from "../../hooks/useAuth";
import { getInterviewHistory } from "../../services/interviewService";
import { getProfile } from "../../services/authService";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [interviews, setInterviews] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [profile, setProfile] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const historyResponse = await getInterviewHistory();

        setInterviews(historyResponse.interviews || []);

        const profileResponse = await getProfile();

        setProfile(profileResponse.user);
      } catch (error) {
        console.error("Dashboard Data Error:", error);

        toast.error(
          error.response?.data?.message || "Unable to load dashboard data.",
        );
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Statistics
  const totalInterviews = interviews.length;

  const scores = interviews
    .map((interview) => Number(interview.overallScore))
    .filter((score) => !Number.isNaN(score) && score > 0);

  const averageScore =
    scores.length > 0
      ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(
          1,
        )
      : "--";

  const bestScore = scores.length > 0 ? Math.max(...scores).toFixed(1) : "--";

  const recentInterviews = interviews.slice(0, 3);

  const getScoreColor = (score) => {
    if (score >= 8) return "text-emerald-400";
    if (score >= 6) return "text-blue-400";
    if (score >= 4) return "text-yellow-400";

    return "text-red-400";
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
                <span className="font-bold text-white">AI</span>
              </div>

              <span className="text-xl font-bold tracking-tight">
                Interview<span className="text-blue-500">AI</span>
              </span>
            </button>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">
                  {profile?.name || "Interview Candidate"}
                </p>

                <p className="text-xs text-slate-500">
                  Your preparation workspace
                </p>
              </div>

              {/* Profile Button */}
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition"
              >
                Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <DashboardHeader />

        {/* Statistics */}
        <section className="mt-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Total Interviews */}
            <div className="ai-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Interviews Completed</p>

                  <h3 className="text-3xl font-bold mt-2">
                    {loadingHistory ? "..." : totalInterviews}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500Resume Analysis/20 flex items-center justify-center text-xl">
                  🎤
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Total completed AI interviews
              </p>
            </div>

            {/* Average Score */}
            <div className="ai-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Average Score</p>

                  <h3 className="text-3xl font-bold mt-2 text-blue-400">
                    {loadingHistory ? "..." : averageScore}
                    {!loadingHistory && averageScore !== "--" && (
                      <span className="text-lg text-slate-600">/10</span>
                    )}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                  📈
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Your overall interview performance
              </p>
            </div>

            {/* Best Score */}
            <div className="ai-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Best Score</p>

                  <h3 className="text-3xl font-bold mt-2 text-emerald-400">
                    {loadingHistory ? "..." : bestScore}

                    {!loadingHistory && bestScore !== "--" && (
                      <span className="text-lg text-slate-600">/10</span>
                    )}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">
                  🏆
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Your highest interview score
              </p>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <div className="mt-12 mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Your workspace
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-2">
            What would you like to do?
          </h2>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <DashboardCard
            icon="📄"
            title="Resume Analysis"
            description="Upload your resume and get an AI-powered ATS score, strengths, weaknesses, missing skills, and improvement suggestions."
            buttonText="Manage Resumes"
            onClick={() => navigate("/resume-management")}
            accent="blue"
          />
          <DashboardCard
            icon="🎤"
            title="Mock Interview"
            description="Practice technical and HR questions generated from your resume and receive instant AI-powered feedback."
            buttonText="Choose Resume"
            onClick={() => navigate("/resume")}
            accent="purple"
          />

          <DashboardCard
            icon="📊"
            title="Interview Reports"
            description="Review your interview performance, scores, weaknesses, strengths, and personalized improvement roadmap."
            buttonText="View Interview History"
            onClick={() => navigate("/history")}
            accent="green"
          />
        </div>

        {/* Recent Interviews */}
        <section className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Progress
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Recent Interviews
              </h2>
            </div>

            {interviews.length > 0 && (
              <button
                onClick={() => navigate("/history")}
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                View all interviews →
              </button>
            )}
          </div>

          {loadingHistory ? (
            <div className="ai-card p-8 text-center">
              <div className="w-7 h-7 mx-auto border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

              <p className="text-slate-500 mt-4">Loading your interviews...</p>
            </div>
          ) : recentInterviews.length === 0 ? (
            <div className="ai-card p-10 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                🎯
              </div>

              <h3 className="text-xl font-bold mt-5">
                Your interview journey starts here
              </h3>

              <p className="text-slate-400 mt-2 max-w-md mx-auto">
                Complete your first AI interview and your performance will
                appear here.
              </p>

              <button
                onClick={() => navigate("/resume")}
                className="ai-button mt-6 px-6 py-3"
              >
                Start Your First Interview
                <span>→</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentInterviews.map((interview) => {
                const score = Number(interview.overallScore) || 0;

                return (
                  <div
                    key={interview._id}
                    className="ai-card p-5 md:p-6 hover:border-blue-500/20 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          🎤
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {interview.interviewType || "Mixed Interview"}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {formatDate(interview.createdAt)}
                            {" • "}
                            {interview.questions?.length || 0} Questions
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Score</p>

                          <p
                            className={`text-xl font-bold ${getScoreColor(
                              score,
                            )}`}
                          >
                            {score}
                            <span className="text-sm text-slate-600">/10</span>
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
                          className="px-4 py-2 rounded-lg border border-slate-700 hover:border-blue-500/30 hover:bg-blue-500/5 text-sm font-medium transition"
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Quick Start */}
        <section className="relative overflow-hidden mt-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 p-7 md:p-9">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Recommended next step
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mt-4">
                Ready to improve your interview skills?
              </h2>

              <p className="text-slate-400 mt-3 leading-relaxed">
                Upload your latest resume and practice personalized questions
                based on your skills, experience, and target role.
              </p>
            </div>

            <button
              onClick={() => navigate("/resume")}
              className="ai-button shrink-0 px-6 py-3.5"
            >
              Start Preparing
              <span>→</span>
            </button>
          </div>
        </section>

        {/* Preparation Steps */}
        <section className="mt-12 pb-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Simple process
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Prepare in three steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            <div className="ai-card p-6 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                1
              </div>

              <h3 className="font-semibold text-lg mt-4">Upload Resume</h3>

              <p className="text-sm text-slate-400 mt-2">
                Let AI analyze your resume and identify areas to improve.
              </p>
            </div>

            <div className="ai-card p-6 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                2
              </div>

              <h3 className="font-semibold text-lg mt-4">Practice Interview</h3>

              <p className="text-sm text-slate-400 mt-2">
                Answer personalized technical and HR interview questions.
              </p>
            </div>

            <div className="ai-card p-6 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                3
              </div>

              <h3 className="font-semibold text-lg mt-4">Improve</h3>

              <p className="text-sm text-slate-400 mt-2">
                Review your performance and follow your personalized roadmap.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
