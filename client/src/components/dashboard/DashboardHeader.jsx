function DashboardHeader() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-32 -left-20 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Small label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          AI Interview Workspace
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-5">
          Welcome back
          <span className="text-blue-500"> 👋</span>
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-lg mt-4 max-w-2xl leading-relaxed">
          Prepare smarter, practice confidently, and use AI-powered feedback to
          become interview-ready.
        </p>
      </div>
    </section>
  );
}

export default DashboardHeader;
