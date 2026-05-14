import { useState } from "react";

import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import { type RootState } from "../../store/store";

import { getExpenses } from "../../services/expenseService";

function ReportsPage() {
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const { selectedMonth, selectedCategory } = useSelector(
    (state: RootState) => state.filters,
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", selectedMonth, selectedCategory],

    queryFn: () =>
      getExpenses({
        month: selectedMonth,
        category: selectedCategory,
      }),
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-500 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
        Failed to load reports
      </div>
    );
  }

  const expenses = data?.expenses || [];

  const filteredExpenses = expenses.filter((expense: any) => {
    const searchText = search.toLowerCase();

    return (
      expense.title.toLowerCase().includes(searchText) ||
      expense.note?.toLowerCase().includes(searchText) ||
      expense.category.toLowerCase().includes(searchText)
    );
  });

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Expense Reports
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Search, filter and analyze all financial records
          </p>
        </div>

        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4 text-white shadow-xl dark:border-indigo-900/40">
          <p className="text-sm font-medium text-indigo-100">Total Records</p>

          <h2 className="mt-1 text-4xl font-black">
            {filteredExpenses.length}
          </h2>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />

          <input
            type="text"
            placeholder="Search by title, note or category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setCurrentPage(1);
            }}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:bg-gray-900"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Expense Records
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Structured financial report view
          </p>
        </div>

        {paginatedExpenses.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              No reports found
            </h3>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Try changing your search query or filters
            </p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Title
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Note
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedExpenses.map((expense: any) => (
                    <tr
                      key={expense._id}
                      className="border-t border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {expense.title}
                          </h3>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-xl bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                          {expense.category}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-black text-gray-900 dark:text-white">
                          ₹ {expense.amount}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-gray-500 dark:text-gray-400">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-gray-500 dark:text-gray-400">
                        {expense.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-6 py-5 dark:border-gray-800 md:flex-row">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {paginatedExpenses.length} of {filteredExpenses.length}{" "}
                records
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                  Page {currentPage} of {totalPages || 1}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;
