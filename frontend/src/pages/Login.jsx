import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Login successful
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

          {/* Logo */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl mb-7">
            ✦
          </div>

          <p className="text-indigo-100 font-semibold tracking-widest text-sm uppercase mb-3">
            Welcome Back
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Your skills.
            <br />
            Your journey.
          </h1>

          <p className="text-indigo-100 text-lg leading-relaxed mt-6 max-w-md">
            Sign in to continue managing your services, bookings and
            SkillNest account.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-12 bg-white/40"></div>

            <span className="text-sm text-indigo-100">
              Everything in one place
            </span>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 md:p-12">

          {/* Heading */}
          <div className="mb-8">
            <p className="text-indigo-400 font-semibold tracking-wide mb-2">
              WELCOME BACK
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Sign in to SkillNest
            </h2>

            <p className="text-slate-400 mt-3">
              Enter your details to access your account.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-5"
          >

            {/* ================= EMAIL ================= */}
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

            {/* ================= PASSWORD ================= */}
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
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3.5 pr-14 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition text-lg"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>
            </div>

            {/* ================= LOGIN BUTTON ================= */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* ================= SIGNUP LINK ================= */}
          <p className="text-center text-slate-400 mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;