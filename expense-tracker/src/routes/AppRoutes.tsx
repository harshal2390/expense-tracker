import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

import ExpensesPage from "../pages/expenses/ExpensesPage";
import NewExpensePage from "../pages/expenses/NewExpensePage";
import EditExpensePage from "../pages/expenses/EditExpensePage";
import SummaryPage from "../pages/summary/SummaryPage";

import ReportsPage from "../pages/reports/ReportsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      {/* protected routes */}

      <Route element={<ProtectedRoute />}>
        <Route path="/expenses" element={<ExpensesPage />} />

        <Route path="/expenses/new" element={<NewExpensePage />} />

        <Route path="/expenses/:id/edit" element={<EditExpensePage />} />
        <Route path="/summary" element={<SummaryPage />} />

        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
