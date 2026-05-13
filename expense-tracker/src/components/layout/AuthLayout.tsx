import { type ReactNode } from "react";
import { Wallet } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />

      {/* Left Side */}
      <div className="hidden flex-1 flex-col justify-between p-12 lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-2xl">
            <Wallet size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">PennyTrack</h1>

            <p className="text-sm text-gray-400">Smart Expense Management</p>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="max-w-xl text-5xl font-black leading-tight text-white">
            Manage your finances with modern clarity.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-400">
            Track expenses, analyze spending habits, and manage your financial
            life with an elegant modern dashboard.
          </p>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500">
          © 2026 PennyTrack. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">{title}</h2>

            <p className="mt-2 text-sm text-gray-300">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
