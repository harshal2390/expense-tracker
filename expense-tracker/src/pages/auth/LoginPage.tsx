import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "../../components/layout/AuthLayout";
import loginSchema from "../../validation/loginSchema";
import { loginUser } from "../../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/expenses");
    },

    onError: (error: any) => {
      alert(error?.response?.data?.message || "Login failed");
    },
  });

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue managing your expenses"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          loginMutation.mutate(values);
        }}
      >
        {() => (
          <Form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Email Address
              </label>

              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white/10"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="mt-1 text-sm text-red-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Password
              </label>

              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white/10"
              />

              <ErrorMessage
                name="password"
                component="p"
                className="mt-1 text-sm text-red-400"
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 font-semibold text-white shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-300">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Create Account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export default LoginPage;
