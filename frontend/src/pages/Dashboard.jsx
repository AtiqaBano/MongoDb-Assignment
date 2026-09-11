import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:4001/api/auth/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/dashboard"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            SkillNest
          </Link>

          <div className="flex items-center gap-4">

            {/* User name */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-white">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {user?.role || "User"}
              </p>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition duration-300"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>


      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">


        {/* ================= WELCOME HERO ================= */}
        <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-2xl">

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-32 right-40 w-80 h-80 bg-white/5 rounded-full"></div>

          <div className="relative">

            <p className="text-indigo-100 font-semibold uppercase tracking-[3px] text-sm">
              Your Dashboard
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-4">
              Welcome, {user?.name?.split(" ")[0] || "User"}! 👋
            </h1>

            <p className="text-indigo-100 text-lg mt-4 max-w-2xl">
              Manage your SkillNest account, explore services and keep
              everything organized from one place.
            </p>

          </div>
        </section>


        {/* ================= STATS ================= */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">

          {/* Account */}
          <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:-translate-y-1 transition duration-300">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider">
                  Account
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Active
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl">
                👤
              </div>

            </div>

            <p className="text-slate-500 text-sm mt-4">
              Your SkillNest account is ready.
            </p>

          </div>


          {/* Services */}
          <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 hover:-translate-y-1 transition duration-300">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider">
                  Services
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Explore
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl">
                🛠️
              </div>

            </div>

            <p className="text-slate-500 text-sm mt-4">
              Find services that match your needs.
            </p>

          </div>


          {/* Bookings */}
          <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-pink-500/50 hover:-translate-y-1 transition duration-300">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-500 text-sm uppercase tracking-wider">
                  Bookings
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  0
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl">
                📅
              </div>

            </div>

            <p className="text-slate-500 text-sm mt-4">
              Your upcoming bookings will appear here.
            </p>

          </div>

        </section>


        {/* ================= ACCOUNT INFO ================= */}
        <section className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <div>
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                Account
              </p>

              <h2 className="text-2xl font-bold mt-1">
                Account Overview
              </h2>
            </div>

          </div>


          <div className="grid md:grid-cols-3 gap-5">

            {/* Name */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <p className="text-slate-500 text-sm">
                FULL NAME
              </p>

              <h3 className="text-lg font-semibold mt-3">
                {user?.name}
              </h3>

            </div>


            {/* Email */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <p className="text-slate-500 text-sm">
                EMAIL ADDRESS
              </p>

              <h3 className="text-lg font-semibold mt-3 break-all">
                {user?.email}
              </h3>

            </div>


            {/* Role */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <p className="text-slate-500 text-sm">
                ACCOUNT ROLE
              </p>

              <div className="flex items-center gap-3 mt-3">

                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm capitalize">
                  {user?.role || "user"}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-10">

          <div className="mb-5">

            <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
              Get Started
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Quick Actions
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-5">

            {/* Explore Services */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-indigo-500/50 hover:bg-slate-900/80 hover:-translate-y-1 transition duration-300 cursor-pointer">

              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-5">
                🛠️
              </div>

              <h3 className="text-xl font-semibold">
                Explore Services
              </h3>

              <p className="text-slate-400 mt-2 leading-relaxed">
                Discover useful services available on SkillNest.
              </p>

              <div className="mt-5 text-indigo-400 text-sm font-semibold">
                Explore →
              </div>

            </div>


            {/* Bookings */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-purple-500/50 hover:bg-slate-900/80 hover:-translate-y-1 transition duration-300 cursor-pointer">

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl mb-5">
                📅
              </div>

              <h3 className="text-xl font-semibold">
                My Bookings
              </h3>

              <p className="text-slate-400 mt-2 leading-relaxed">
                Keep track of your upcoming service bookings.
              </p>

              <div className="mt-5 text-purple-400 text-sm font-semibold">
                View bookings →
              </div>

            </div>


            {/* Profile */}
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-pink-500/50 hover:bg-slate-900/80 hover:-translate-y-1 transition duration-300 cursor-pointer">

              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl mb-5">
                👤
              </div>

              <h3 className="text-xl font-semibold">
                My Profile
              </h3>

              <p className="text-slate-400 mt-2 leading-relaxed">
                Manage your SkillNest account information.
              </p>

              <div className="mt-5 text-pink-400 text-sm font-semibold">
                View profile →
              </div>

            </div>

          </div>

        </section>


        {/* ================= FOOTER MESSAGE ================= */}
        <div className="text-center py-10 mt-6">

          <p className="text-slate-600 text-sm">
            SkillNest • Your skills, your journey.
          </p>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;