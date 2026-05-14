import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import ExpenseForm from "../../components/forms/ExpenseForm";

import { createExpense } from "../../services/expenseService";

function NewExpensePage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createExpenseMutation = useMutation({
    mutationFn: createExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      navigate("/expenses");
    },

    onError: () => {
      alert("Failed to create expense");
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          Add New Expense
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Record and manage your financial activity
        </p>
      </div>

      <ExpenseForm
        initialValues={{
          title: "",
          amount: "",
          category: "",
          date: "",
          note: "",
        }}
        onSubmit={(values) => {
          createExpenseMutation.mutate(values);
        }}
        isLoading={createExpenseMutation.isPending}
        buttonText="Create Expense"
      />
    </div>
  );
}

export default NewExpensePage;
