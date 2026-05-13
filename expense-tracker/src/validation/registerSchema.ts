import * as Yup from "yup";

const registerSchema = Yup.object({
  name: Yup.string().min(2, "Name too short").required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default registerSchema;
