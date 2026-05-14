import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ExpenseForm from "../../components/forms/ExpenseForm";

import { getSingleExpense, updateExpense } from "../../services/expenseService";

function EditExpensePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // fetch single expense
  const { data, isLoading, error } = useQuery({
    queryKey: ["expense", id],

    queryFn: () => getSingleExpense(id as string),

    enabled: !!id,
  });

  //  Update expense

  const updateMutation = useMutation({
    mutationFn: (values: any) => updateExpense(id as string, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["expense", id],
      });

      navigate("/expenses");
    },

    onError: () => {
      alert("Failed to update expense");
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading expense...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data?.expense) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
        Failed to load expense
      </div>
    );
  }

  const expense = data.expense;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          Edit Expense
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Update and manage your expense details
        </p>
      </div>

      <ExpenseForm
        initialValues={{
          title: expense.title || "",
          amount: expense.amount || "",
          category: expense.category || "",
          date: expense.date ? expense.date.split("T")[0] : "",
          note: expense.note || "",
        }}
        onSubmit={(values) => {
          updateMutation.mutate(values);
        }}
        isLoading={updateMutation.isPending}
        buttonText="Update Expense"
      />
    </div>
  );
}

export default EditExpensePage;
