import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getMyResumes, deleteResume } from "../../services/resumeService";

function ResumeManagement() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await getMyResumes();

        console.log("My Resumes:", response);

        setResumes(
          (response.resumes || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        );
      } catch (error) {
        console.error("Get Resumes Error:", error);

        toast.error(
          error.response?.data?.message || "Failed to load your resumes.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleDelete = async (resumeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteResume(resumeId);

      setResumes((currentResumes) =>
        currentResumes.filter((resume) => resume._id !== resumeId),
      );

      toast.success("Resume deleted successfully.");
    } catch (error) {
      console.error("Delete Resume Error:", error);

      toast.error(error.response?.data?.message || "Failed to delete resume.");
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
              className="text-slate-400 hover:text-white transition"
            >
              ← Back to Dashboard
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="font-bold">AI</span>
              </div>

              <span className="text-xl font-bold">
                Interview<span className="text-blue-500">AI</span>
              </span>
            </div>

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
        {/* Heading */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Resume Management
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                Your Resumes
              </h1>

              <p className="text-slate-400 text-lg mt-3">
                Manage your uploaded resumes and view your AI analysis.
                {!loading && resumes.length > 0 && (
                  <span className="ml-2 text-blue-400">
                    ({resumes.length}{" "}
                    {resumes.length === 1 ? "resume" : "resumes"})
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={() => navigate("/resume")}
              className="ai-button shrink-0 px-5 py-3"
            >
              + Upload New Resume
            </button>
          </div>
        </section>

        {/* Loading */}
        {loading ? (
          <div className="ai-card p-10 text-center">
            <div className="w-8 h-8 mx-auto border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

            <p className="text-slate-400 mt-4">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div className="ai-card p-10 md:p-14 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-4xl">
              📄
            </div>

            <h2 className="text-2xl font-bold mt-6">No resumes uploaded</h2>

            <p className="text-slate-400 mt-3 max-w-md mx-auto">
              Upload your resume to get an AI-powered ATS score, strengths,
              weaknesses, missing skills, and personalized recommendations.
            </p>

            <button
              onClick={() => navigate("/resume")}
              className="ai-button mt-7 px-6 py-3"
            >
              Upload Your Resume
              <span>→</span>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-3 px-6 py-3 text-sm text-slate-400 hover:text-white transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        ) : (
          /* Resume List */
          <div className="space-y-5">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className={`ai-card p-6 transition ${
                  resume._id === resumes[0]?._id
                    ? "border-blue-500/30 bg-blue-500/[0.02]"
                    : "hover:border-blue-500/20"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Resume Information */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                      📄
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold">
                          {resume.fileName}
                        </h2>

                        {resume._id === resumes[0]?._id && (
                          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400">
                            Latest
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        Uploaded on {formatDate(resume.createdAt)}
                      </p>

                      {resume.aiAnalysis && (
                        <div className="flex items-center gap-2 mt-3">
                          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                            AI Analysis Available
                          </span>

                          <span className="text-sm text-slate-500">
                            ATS Score:{" "}
                            <span className="text-blue-400 font-semibold">
                              {resume.aiAnalysis.atsScore ?? 0}/100
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {resume.aiAnalysis && (
                      <button
                        onClick={() =>
                          navigate("/resume-result", {
                            state: {
                              resumeData: {
                                resume,
                                aiAnalysis: resume.aiAnalysis,
                              },
                            },
                          })
                        }
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium transition"
                      >
                        View Analysis
                      </button>
                    )}
                    {resume.aiAnalysis && (
                      <button
                        onClick={() =>
                          navigate("/resume-result", {
                            state: {
                              resumeData: {
                                resume,
                                aiAnalysis: resume.aiAnalysis,
                              },
                            },
                          })
                        }
                        className="px-5 py-2.5 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition"
                      >
                        🎤 Use for Interview
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ResumeManagement;
