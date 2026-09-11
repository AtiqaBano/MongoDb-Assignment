import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4001/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl mb-6">
              ✦
            </div>

            <p className="text-indigo-100 font-semibold tracking-widest text-sm uppercase mb-3">
              SkillNest
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Build your skills.
              <br />
              Grow your future.
            </h1>

            <p className="text-indigo-100 text-lg leading-relaxed mt-6 max-w-md">
              Join SkillNest and manage your skills, services and bookings
              from one simple platform.
            </p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              <span>Discover useful services</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              <span>Manage your bookings</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              <span>Grow with SkillNest</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">

          <div className="mb-8">
            <p className="text-indigo-400 font-semibold tracking-wide mb-2">
              GET STARTED
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Create your account
            </h2>

            <p className="text-slate-400 mt-3">
              Start your SkillNest journey today.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-5"
          >

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="off"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="off"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3.5 pr-14 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-slate-400 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;