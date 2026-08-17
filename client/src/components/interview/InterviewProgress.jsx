function InterviewProgress({ currentQuestion, totalQuestions }) {
  const progress =
    totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Interview Progress</span>

        <span>
          {currentQuestion} of {totalQuestions}
        </span>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default InterviewProgress;
