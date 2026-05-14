import { Navigate, Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

function ProtectedRoute() {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedRoute;
