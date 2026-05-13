import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

import { type RootState } from "../../store/store";

import { getExpenses } from "../../services/expenseService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
);

function SummaryPage() {
  const { selectedMonth, selectedCategory } = useSelector(
    (state: RootState) => state.filters,
  );

  /* =========================
     FETCH EXPENSES
  ========================= */
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", selectedMonth, selectedCategory],

    queryFn: () =>
      getExpenses({
        month: selectedMonth,
        category: selectedCategory,
      }),
  });

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-500 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
        Failed to load analytics
      </div>
    );
  }

  const expenses = data?.expenses || [];

  /* =========================
     CALCULATIONS
  ========================= */

  /* Total Spending */
  const totalSpending = expenses.reduce(
    (total: number, expense: any) => total + expense.amount,
    0,
  );

  /* Average Expense */
  const averageExpense =
    expenses.length > 0 ? totalSpending / expenses.length : 0;

  /* Highest Expense */
  const highestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];

  /* Lowest Expense */
  const lowestExpense = [...expenses].sort((a, b) => a.amount - b.amount)[0];

  /* Category Totals */
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense: any) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  /* Highest Category */
  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  /* Chart Colors */
  const chartColors = [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  /* Doughnut Chart */
  const doughnutData = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals),

        backgroundColor: chartColors,

        borderWidth: 0,
      },
    ],
  };

  /* Bar Chart */
  const barData = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        label: "Category Spending",

        data: Object.values(categoryTotals),

        backgroundColor: "#6366f1",

        borderRadius: 12,
      },
    ],
  };

  /* Line Chart */
  const lineData = {
    labels: expenses.map((expense: any) =>
      new Date(expense.date).toLocaleDateString(),
    ),

    datasets: [
      {
        label: "Expense Trend",

        data: expenses.map((expense: any) => expense.amount),

        borderColor: "#8b5cf6",

        backgroundColor: "rgba(139, 92, 246, 0.1)",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Financial Analytics
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Deep insights into your financial behavior and spending trends
          </p>
        </div>

        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4 text-white shadow-xl dark:border-indigo-900/40">
          <p className="text-sm font-medium text-indigo-100">
            Total Tracked Spending
          </p>

          <h2 className="mt-1 text-4xl font-black">₹ {totalSpending}</h2>
        </div>
      </div>

      {/* =========================
          ANALYTICS CARDS
      ========================= */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Expenses */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Expenses
          </p>

          <h2 className="mt-3 text-4xl font-black text-gray-900 dark:text-white">
            {expenses.length}
          </h2>
        </div>

        {/* Average */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Average Expense
          </p>

          <h2 className="mt-3 text-4xl font-black text-gray-900 dark:text-white">
            ₹ {averageExpense.toFixed(0)}
          </h2>
        </div>

        {/* Top Category */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Top Category
          </p>

          <h2 className="mt-3 text-3xl font-black text-gray-900 dark:text-white">
            {highestCategory ? highestCategory[0] : "N/A"}
          </h2>
        </div>

        {/* Highest Expense */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Highest Expense
          </p>

          <h2 className="mt-3 text-3xl font-black text-gray-900 dark:text-white">
            ₹ {highestExpense ? highestExpense.amount : 0}
          </h2>
        </div>
      </div>

      {/* =========================
          CHARTS
      ========================= */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Doughnut */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Category Distribution
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Spending breakdown by category
            </p>
          </div>

          <div className="mx-auto max-w-sm">
            <Doughnut data={doughnutData} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Category Spending
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Compare spending across categories
            </p>
          </div>

          <Bar data={barData} />
        </div>
      </div>

      {/* =========================
          LINE CHART
      ========================= */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Spending Trend
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Expense activity over time
          </p>
        </div>

        <Line data={lineData} />
      </div>

      {/* =========================
          INSIGHTS SECTION
      ========================= */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Spending Insights */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Smart Insights
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              AI-like financial observations
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-950/40">
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                Highest Spending Category
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {highestCategory ? highestCategory[0] : "N/A"}
              </h3>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/40">
              <p className="text-sm font-medium text-violet-600 dark:text-violet-300">
                Largest Expense
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {highestExpense ? highestExpense.title : "N/A"}
              </h3>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40">
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
                Smallest Expense
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {lowestExpense ? lowestExpense.title : "N/A"}
              </h3>
            </div>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Latest financial transactions
            </p>
          </div>

          <div className="space-y-4">
            {[...expenses]
              .reverse()
              .slice(0, 5)
              .map((expense: any) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 dark:bg-gray-800"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {expense.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {expense.category}
                    </p>
                  </div>

                  <p className="text-lg font-black text-gray-900 dark:text-white">
                    ₹ {expense.amount}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
