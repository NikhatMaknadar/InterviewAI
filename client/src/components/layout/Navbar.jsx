import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition ${
      isActive ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
              <span className="text-white font-bold text-lg">AI</span>
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Interview<span className="text-blue-500">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/resume" className={navLinkClass}>
                  Resume
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link to="/register" className="ai-button text-sm px-5 py-2.5">
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-700 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                Home
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={navLinkClass}
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/resume"
                    onClick={() => setMobileMenuOpen(false)}
                    className={navLinkClass}
                  >
                    Resume
                  </NavLink>
                </>
              )}

              <div className="border-t border-slate-800 mt-3 pt-3">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 text-sm text-slate-300 hover:text-white transition"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="ai-button text-sm"
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
