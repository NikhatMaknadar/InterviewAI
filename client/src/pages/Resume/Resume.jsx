import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { uploadResume } from "../../services/resumeService";

function Resume() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (!file) {
      return false;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be less than 5 MB.");
      return false;
    }

    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!validateFile(file)) {
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select your resume first.");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadResume(selectedFile);

      toast.success(response.message || "Resume uploaded successfully!");

      console.log("Resume Response:", response);

      navigate("/resume-management");
    } catch (error) {
      console.error("Resume Upload Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Resume upload failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI Resume Analysis
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-5">
            Turn your resume into
            <span className="text-blue-400"> an interview advantage.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-5 leading-relaxed">
            Upload your resume and let InterviewAI analyze your ATS
            compatibility, strengths, weaknesses, missing skills, and interview
            readiness.
          </p>
        </div>

        {/* Upload Card */}
        <div className="relative mt-12 ai-card p-6 md:p-8">
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed p-10 md:p-14 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-blue-400 bg-blue-500/10"
                : selectedFile
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-slate-700 bg-slate-900/40 hover:border-blue-500/50 hover:bg-blue-500/5"
            }`}
          >
            {/* Upload Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl">
              {selectedFile ? "📄" : "☁️"}
            </div>

            <h2 className="text-xl md:text-2xl font-semibold mt-5">
              {selectedFile ? "Resume selected" : "Upload your resume"}
            </h2>

            <p className="text-slate-400 mt-3">
              {selectedFile
                ? selectedFile.name
                : "Drag & drop your PDF here or click to browse"}
            </p>

            <p className="text-xs text-slate-500 mt-3">
              PDF only · Maximum file size 5 MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="font-medium truncate">{selectedFile.name}</p>

                  <p className="text-sm text-slate-500 mt-1">
                    {(selectedFile.size / 1024).toFixed(1)} KB · PDF
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                disabled={loading}
                className="shrink-0 text-sm text-red-400 hover:text-red-300 transition"
              >
                Remove
              </button>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="ai-button w-full mt-6 py-3.5"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                Upload & Analyze Resume
                <span>→</span>
              </>
            )}
          </button>
        </div>

        {/* What AI analyzes */}
        <section className="mt-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              What you'll get
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Your resume, analyzed by AI
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
            <div className="ai-card p-5">
              <div className="text-2xl">🎯</div>

              <h3 className="font-semibold mt-4">ATS Score</h3>

              <p className="text-sm text-slate-400 mt-2">
                See how well your resume performs against ATS systems.
              </p>
            </div>

            <div className="ai-card p-5">
              <div className="text-2xl">💪</div>

              <h3 className="font-semibold mt-4">Strengths</h3>

              <p className="text-sm text-slate-400 mt-2">
                Discover what already makes your resume strong.
              </p>
            </div>

            <div className="ai-card p-5">
              <div className="text-2xl">🧠</div>

              <h3 className="font-semibold mt-4">Missing Skills</h3>

              <p className="text-sm text-slate-400 mt-2">
                Identify skills that could improve your profile.
              </p>
            </div>

            <div className="ai-card p-5">
              <div className="text-2xl">🚀</div>

              <h3 className="font-semibold mt-4">Roadmap</h3>

              <p className="text-sm text-slate-400 mt-2">
                Get actionable steps to become interview-ready.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mt-12 ai-card p-7 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-7">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl">
                ✨
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                What happens after upload?
              </h3>

              <p className="text-slate-400 mt-2 leading-relaxed">
                InterviewAI extracts the text from your resume, analyzes your
                profile using AI, and prepares personalized interview insights
                and questions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Resume;
