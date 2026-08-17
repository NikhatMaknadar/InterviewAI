function InterviewQuestion({ question }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
      <p className="text-sm text-blue-400 font-semibold uppercase tracking-wide mb-3">
        Interview Question
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
        {question}
      </h2>
    </div>
  );
}

export default InterviewQuestion;
