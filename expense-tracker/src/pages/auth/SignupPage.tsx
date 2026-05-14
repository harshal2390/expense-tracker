import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";

import AuthLayout from "../../components/layout/AuthLayout";

import registerSchema from "../../validation/registerSchema";

import { registerUser } from "../../services/authService";

function SignupPage() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      navigate("/login");
    },

    onError: (error: any) => {
      alert(error?.response?.data?.message || "Registration failed");
    },
  });

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start tracking your expenses smarter"
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          registerMutation.mutate(values);
        }}
      >
        {() => (
          <Form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Full Name
              </label>

              <Field
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white/10"
              />

              <ErrorMessage
                name="name"
                component="p"
                className="mt-1 text-sm text-red-400"
              />
            </div>

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
                placeholder="Create a password"
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
              disabled={registerMutation.isPending}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 font-semibold text-white shadow-xl transition-all hover:scale-[1.02]"
            >
              {registerMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign In
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export default SignupPage;
