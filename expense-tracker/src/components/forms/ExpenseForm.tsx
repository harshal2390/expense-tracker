import { ErrorMessage, Field, Form, Formik } from "formik";

import expenseSchema from "../../validation/expenseSchema";

interface ExpenseFormProps {
  initialValues: {
    title: string;
    amount: number | string;
    category: string;
    date: string;
    note: string;
  };

  onSubmit: (values: any) => void;

  isLoading: boolean;

  buttonText: string;
}

function ExpenseForm({
  initialValues,
  onSubmit,
  isLoading,
  buttonText,
}: ExpenseFormProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Formik
        initialValues={initialValues}
        validationSchema={expenseSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Expense Title
              </label>

              <Field
                type="text"
                name="title"
                placeholder="Enter expense title"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:bg-gray-900"
              />

              <ErrorMessage
                name="title"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Amount
              </label>

              <Field
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:bg-gray-900"
              />

              <ErrorMessage
                name="amount"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category
              </label>

              <Field
                as="select"
                name="category"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-900"
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
              </Field>

              <ErrorMessage
                name="category"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Expense Date
              </label>

              <Field
                type="date"
                name="date"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-gray-900"
              />

              <ErrorMessage
                name="date"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Note
              </label>

              <Field
                as="textarea"
                rows={4}
                name="note"
                placeholder="Optional note"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:bg-gray-900"
              />

              <ErrorMessage
                name="note"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70"
            >
              {isLoading ? "Processing..." : buttonText}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ExpenseForm;
