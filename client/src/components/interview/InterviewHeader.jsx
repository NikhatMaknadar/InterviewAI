function InterviewHeader({
  interviewType,
  currentQuestion,
  totalQuestions,
  onExit,
}) {
  return (
    <header className="border-b border-slate-700 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-500">InterviewAI</h1>

          <p className="text-sm text-gray-400 mt-1">
            {interviewType || "Mixed"} Interview
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">Question</p>

          <p className="text-lg font-semibold text-white">
            {currentQuestion} / {totalQuestions}
          </p>
        </div>

        <button
          type="button"
          onClick={onExit}
          className="px-4 py-2 rounded-lg border border-slate-600 text-gray-300 hover:bg-slate-800 hover:text-white transition"
        >
          Exit
        </button>
      </div>
    </header>
  );
}

export default InterviewHeader;
