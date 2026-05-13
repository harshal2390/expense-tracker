import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ExpenseForm from "../../components/forms/ExpenseForm";

import { getSingleExpense, updateExpense } from "../../services/expenseService";

function EditExpensePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  /* =========================
     FETCH SINGLE EXPENSE
  ========================= */
  const { data, isLoading, error } = useQuery({
    queryKey: ["expense", id],

    queryFn: () => getSingleExpense(id as string),

    enabled: !!id,
  });

  /* =========================
     UPDATE MUTATION
  ========================= */
  const updateMutation = useMutation({
    mutationFn: (values: any) => updateExpense(id as string, values),

    onSuccess: () => {
      /* Refetch expense list */
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      /* Refetch single expense */
      queryClient.invalidateQueries({
        queryKey: ["expense", id],
      });

      navigate("/expenses");
    },

    onError: () => {
      alert("Failed to update expense");
    },
  });

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-lg font-medium text-gray-600">
            Loading expense...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */
  if (error || !data?.expense) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-500">
        Failed to load expense
      </div>
    );
  }

  const expense = data.expense;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Edit Expense
        </h1>

        <p className="mt-2 text-gray-500">
          Update and manage your expense details
        </p>
      </div>

      {/* Form */}
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
