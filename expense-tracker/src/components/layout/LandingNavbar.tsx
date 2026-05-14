import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-xl">
            <Wallet size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">PennyTrack</h1>

            <p className="text-xs text-gray-400">Smart Expense Tracking</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
