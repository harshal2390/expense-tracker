import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Receipt, ShieldCheck } from "lucide-react";

import LandingNavbar from "../components/layout/LandingNavbar";
import Footer from "../components/layout/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-lg">
            Modern Expense Tracking Platform
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Manage your expenses with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              clarity & intelligence
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Track spending, analyze reports, and manage finances with a
            beautiful modern dashboard.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-4 font-semibold text-white shadow-2xl transition hover:scale-105"
            >
              Start Tracking
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-lg transition hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
            <Receipt size={28} />
          </div>

          <h3 className="text-2xl font-bold">Expense Tracking</h3>

          <p className="mt-4 leading-7 text-gray-400">
            Easily manage and organize daily expenses with smart categorization
            and tracking.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400">
            <BarChart3 size={28} />
          </div>

          <h3 className="text-2xl font-bold">Smart Reports</h3>

          <p className="mt-4 leading-7 text-gray-400">
            Analyze spending trends with clean reports, filters, and monthly
            summaries.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <ShieldCheck size={28} />
          </div>

          <h3 className="text-2xl font-bold">Secure Access</h3>

          <p className="mt-4 leading-7 text-gray-400">
            JWT authentication and protected routes ensure secure financial
            management.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
