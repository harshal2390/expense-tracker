import * as Yup from "yup";

const expenseSchema = Yup.object({
  title: Yup.string().min(2, "Title too short").required("Title is required"),

  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  category: Yup.string().required("Category is required"),

  date: Yup.string().required("Date is required"),

  note: Yup.string().max(120, "Note cannot exceed 120 characters"),
});

export default expenseSchema;
