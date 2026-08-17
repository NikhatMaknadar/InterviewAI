import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>

              <span className="text-xl font-bold text-white">
                Interview<span className="text-blue-500">AI</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-slate-400 leading-relaxed">
              Prepare smarter, practice confidently, and improve your interview
              performance with personalized AI feedback.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Product
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/resume"
                className="text-slate-400 hover:text-white transition"
              >
                Resume Analysis
              </Link>

              <Link
                to="/interview"
                className="text-slate-400 hover:text-white transition"
              >
                AI Interview
              </Link>

              <Link
                to="/dashboard"
                className="text-slate-400 hover:text-white transition"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/login"
                className="text-slate-400 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-slate-400 hover:text-white transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} InterviewAI. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built with AI to help you interview better.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
