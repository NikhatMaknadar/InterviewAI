function AnswerBox({ answer, setAnswer, onSubmit, loading }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <label
        htmlFor="answer"
        className="block text-lg font-semibold text-white mb-3"
      >
        Your Answer
      </label>

      <textarea
        id="answer"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Type your answer here..."
        rows={8}
        disabled={loading}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition"
      />

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">{answer.length} characters</p>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || !answer.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
        >
          {loading ? "Evaluating..." : "Submit Answer →"}
        </button>
      </div>
    </div>
  );
}

export default AnswerBox;
