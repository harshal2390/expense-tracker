import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import { type RootState } from "../../store/store";
import { deleteExpense, getExpenses } from "../../services/expenseService";
import ExpenseFilters from "../../components/expense/ExpenseFilters";

function ExpensesPage() {
  /* =========================
     LOCAL UI STATE
  ========================= */
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  /* =========================
     REDUX FILTER STATE
  ========================= */
  const { selectedMonth, selectedCategory } = useSelector(
    (state: RootState) => state.filters,
  );

  /* =========================
     REACT QUERY CLIENT
  ========================= */
  const queryClient = useQueryClient();

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
     DELETE EXPENSE
  ========================= */
  const deleteMutation = useMutation({
    mutationFn: deleteExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      setSelectedExpense(null);
    },

    onError: () => {
      alert("Failed to delete expense");
    },
  });

  /* =========================
     LOADING STATE
  ========================= */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-lg font-medium text-gray-600">
            Loading expenses...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-500">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* =========================
            HEADER
        ========================= */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900">
              Expenses Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Track and manage your financial activity
            </p>
          </div>

          {/* Expense Count */}
          <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-4 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>

            <h2 className="mt-1 text-3xl font-black text-gray-900">
              {data?.expenses?.length || 0}
            </h2>
          </div>
        </div>

        {/* =========================
            FILTERS
        ========================= */}
        <ExpenseFilters />

        {/* =========================
            EXPENSE LIST
        ========================= */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Expenses
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest financial activities
              </p>
            </div>
          </div>

          {/* EMPTY STATE */}
          {data?.expenses?.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center">
              <div className="mx-auto max-w-md">
                <h3 className="text-2xl font-bold text-gray-800">
                  No expenses found
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  Try changing filters or start by adding your first expense to
                  track your financial activity.
                </p>
              </div>
            </div>
          ) : (
            /* EXPENSE ITEMS */
            <div className="space-y-4">
              {data?.expenses?.map((expense: any) => (
                <div
                  key={expense._id}
                  className="group flex flex-col gap-4 rounded-3xl border border-gray-100 p-5 transition-all hover:border-indigo-200 hover:shadow-md md:flex-row md:items-center md:justify-between"
                >
                  {/* =========================
                        LEFT SIDE
                    ========================= */}
                  <div className="flex items-center gap-4">
                    {/* Category Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg">
                      {expense.category.charAt(0)}
                    </div>

                    {/* Expense Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {expense.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-3">
                        <p className="rounded-xl bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          {expense.category}
                        </p>

                        <p className="text-sm text-gray-400">
                          {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>

                      {expense.note && (
                        <p className="mt-2 text-sm text-gray-500">
                          {expense.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* =========================
                        RIGHT SIDE
                    ========================= */}
                  <div className="flex flex-col items-end gap-4">
                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">
                        ₹ {expense.amount}
                      </p>

                      <p className="mt-1 text-sm text-emerald-500">
                        Expense Recorded
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {/* Edit */}
                      <Link
                        to={`/expenses/${expense._id}/edit`}
                        className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => setSelectedExpense(expense)}
                        className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          DELETE MODAL
      ========================= */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Delete Expense
              </h2>

              <p className="mt-2 leading-7 text-gray-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {selectedExpense.title}
                </span>
                ?
              </p>
            </div>

            {/* Expense Preview */}
            <div className="mt-6 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedExpense.category}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(selectedExpense.date).toLocaleDateString()}
                  </p>
                </div>

                <p className="text-xl font-black text-gray-900">
                  ₹ {selectedExpense.amount}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-end gap-3">
              {/* Cancel */}
              <button
                onClick={() => setSelectedExpense(null)}
                className="rounded-2xl border border-gray-200 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={() => deleteMutation.mutate(selectedExpense._id)}
                disabled={deleteMutation.isPending}
                className="rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600 disabled:opacity-70"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete Expense"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpensesPage;
