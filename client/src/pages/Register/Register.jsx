import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await registerUser(userData);

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      {/* Main */}
      <div className="relative min-h-screen flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
                <span className="font-bold text-white">AI</span>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Interview<span className="text-blue-500">AI</span>
              </span>
            </Link>
          </div>

          {/* Register Card */}
          <div className="ai-card p-7 sm:p-9">
            {/* Heading */}
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                🚀
              </div>

              <h1 className="text-3xl font-bold mt-5">Create your account</h1>

              <p className="text-slate-400 mt-2">
                Start preparing for your next interview with AI.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                    errors.name ? "border-red-500/60" : "border-slate-700"
                  } text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition`}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                    errors.email ? "border-red-500/60" : "border-slate-700"
                  } text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Please enter a valid Gmail address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 pr-20 rounded-xl bg-slate-900 border ${
                      errors.password ? "border-red-500/60" : "border-slate-700"
                    } text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                        message:
                          "Password must contain uppercase, lowercase, number and special character",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-400 hover:text-blue-300 transition"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}

                <p className="text-xs text-slate-500 mt-2">
                  Use at least 8 characters with uppercase, lowercase, number,
                  and special character.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 pr-20 rounded-xl bg-slate-900 border ${
                      errors.confirmPassword
                        ? "border-red-500/60"
                        : "border-slate-700"
                    } text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Passwords do not match",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-400 hover:text-blue-300 transition"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="ai-button w-full py-3.5 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>

              <div className="relative flex justify-center">
                <span className="px-3 bg-slate-900 text-xs text-slate-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link
              to="/login"
              className="block w-full text-center py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition font-medium"
            >
              Sign in to InterviewAI
            </Link>
          </div>

          {/* Bottom text */}
          <p className="text-center text-xs text-slate-600 mt-6">
            Start your journey toward better interviews.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
