import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import { getProfile, updateProfile } from "../../services/authService";

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Temporary values used inside modal
  const [editName, setEditName] = useState("");

  // =================================
  // Get logged-in user's profile
  // =================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await getProfile();

        console.log("Profile Response:", response);

        setName(response.user.name);
        setEmail(response.user.email);
      } catch (error) {
        console.error("Get Profile Error:", error);

        toast.error(error.response?.data?.message || "Failed to load profile.");

        // If token is invalid/expired
        if (error.response?.status === 401) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  // =================================
  // Logout
  // =================================
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // =================================
  // Open Edit Profile Modal
  // =================================
  const handleOpenEdit = () => {
    setEditName(name);
    setEditing(true);
  };

  // =================================
  // Save Profile
  // =================================
  const handleSave = async (event) => {
    event.preventDefault();

    if (!editName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateProfile({
        name: editName,
      });

      console.log("Update Profile Response:", response);

      setName(response.user.name);

      setEditing(false);

      toast.success(response.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);

      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // =================================
  // Avatar initials
  // =================================
  const getInitials = () => {
    if (!name) return "AI";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // =================================
  // Loading
  // =================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

          <p className="text-slate-400 mt-4">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Dashboard */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <span className="text-lg">←</span>

              <span className="text-sm font-medium">Dashboard</span>
            </button>

            {/* Logo */}
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

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        {/* Heading */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Account Settings
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-5">
            Your profile
            <span className="text-blue-400"> settings.</span>
          </h1>

          <p className="text-slate-400 text-lg mt-3 max-w-2xl">
            Manage your personal information and account preferences.
          </p>
        </section>

        {/* Profile Card */}
        <section className="ai-card p-7 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20">
              {getInitials()}
            </div>

            {/* User Information */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{name}</h2>

              <p className="text-slate-400 mt-1">{email}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                  Interview Candidate
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                  Account Active
                </span>
              </div>
            </div>

            {/* Edit */}
            <button
              onClick={handleOpenEdit}
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-blue-500/30 hover:bg-blue-500/5 text-slate-200 transition font-medium"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Account */}
        <section className="ai-card p-7 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              ⚙️
            </div>

            <div>
              <h2 className="text-xl font-bold">Account</h2>

              <p className="text-sm text-slate-500">Manage your account</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Security */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <h3 className="font-medium">Password & Security</h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Keep your account secure
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-600">Coming soon</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  🚪
                </div>

                <div>
                  <h3 className="font-medium text-red-400">Sign Out</h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Sign out of your InterviewAI account
                  </p>
                </div>
              </div>

              <span className="text-red-400">→</span>
            </button>
          </div>
        </section>

        {/* Back */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-slate-500 hover:text-blue-400 transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </main>

      {/* ============================= */}
      {/* Edit Profile Modal */}
      {/* ============================= */}

      {editing && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditing(false);
            }
          }}
        >
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/40">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold">Edit Profile</h2>

                <p className="text-sm text-slate-500 mt-1">
                  Update your personal information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditing(false)}
                disabled={saving}
                className="w-9 h-9 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-xl"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-5">
                {/* Personal Information */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    👤
                  </div>

                  <div>
                    <h3 className="font-semibold">Personal Information</h3>

                    <p className="text-xs text-slate-500">
                      Update your basic account information
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    placeholder="Enter your full name"
                    disabled={saving}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-blue-500 transition disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>

                  {/* Email - Read Only */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>

                    <div className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-300 flex-1">{email}</span>

                      <span className="text-xs text-slate-500">
                        🔒 Read only
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2">
                      Your email address is used for login and cannot be
                      changed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 transition font-medium disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="ai-button px-5 py-2.5 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}

                  {!saving && <span>→</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
