import { NavLink, useNavigate } from "react-router-dom";
import { Wallet, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
            <Wallet size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              PennyTrack
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Smart Expense Management
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`
            }
          >
            Expenses
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`
            }
          >
            Reports
          </NavLink>

          <NavLink
            to="/summary"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`
            }
          >
            Summary
          </NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/expenses/new")}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            + Add Expense
          </button>

          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
