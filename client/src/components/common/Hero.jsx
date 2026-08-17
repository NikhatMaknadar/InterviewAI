import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            AI-powered interview preparation
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Prepare smarter.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Interview better.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-7 text-lg md:text-xl leading-relaxed text-slate-400">
            Analyze your resume, practice personalized AI mock interviews,
            receive instant feedback, and discover exactly what you need to
            improve before your real interview.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="ai-button w-full sm:w-auto px-8 py-3.5"
            >
              Start Preparing Free
              <span>→</span>
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-slate-500 transition text-center"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Product Preview */}
        <div className="relative max-w-5xl mx-auto mt-20">
          {/* Glow */}
          <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full" />

          <div className="relative ai-card p-2 md:p-3">
            {/* Browser Header */}
            <div className="rounded-t-xl bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />

              <div className="hidden sm:block ml-4 flex-1 max-w-md mx-auto h-7 rounded-md bg-slate-800" />
            </div>

            {/* Dashboard Preview */}
            <div className="bg-slate-950 rounded-b-xl p-5 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500">
                    INTERVIEW PERFORMANCE
                  </p>

                  <h3 className="text-lg md:text-xl font-semibold mt-1">
                    Your AI Interview
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                  Completed
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Score */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <p className="text-sm text-slate-500">Overall Score</p>

                  <div className="flex items-end gap-2 mt-3">
                    <span className="text-4xl font-bold text-blue-400">
                      8.6
                    </span>

                    <span className="text-slate-500 mb-1">/ 10</span>
                  </div>

                  <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-[86%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                  </div>
                </div>

                {/* Strength */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <p className="text-sm text-slate-500">Top Strength</p>

                  <h4 className="mt-3 font-semibold">Technical Knowledge</h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Strong understanding of core concepts.
                  </p>
                </div>

                {/* Improvement */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <p className="text-sm text-slate-500">Improve</p>

                  <h4 className="mt-3 font-semibold">Communication</h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Give clearer and more structured answers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
