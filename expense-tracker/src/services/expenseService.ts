import api from "./api";

export async function getExpenses(params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  month?: string;
}) {
  const response = await api.get("/expenses", {
    params,
  });

  return response.data;
}

export async function createExpense(data: {
  title: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}) {
  const response = await api.post("/expenses", data);

  return response.data;
}

export async function getSingleExpense(id: string) {
  const response = await api.get(`/expenses/${id}`);

  return response.data;
}

export async function updateExpense(id: string, data: any) {
  const response = await api.patch(`/expenses/${id}`, data);

  return response.data;
}

export async function deleteExpense(id: string) {
  const response = await api.delete(`/expenses/${id}`);

  return response.data;
}
