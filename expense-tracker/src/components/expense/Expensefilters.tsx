import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedCategory,
  setSelectedMonth,
} from "../../store/slices/filterSlice";

import { type RootState } from "../../store/store";

function ExpenseFilters() {
  const dispatch = useDispatch();

  const { selectedMonth, selectedCategory } = useSelector(
    (state: RootState) => state.filters,
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Select Month
          </label>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => dispatch(setSelectedMonth(e.target.value))}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-900"
          />
        </div>

        <div className="flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-900"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ExpenseFilters;
