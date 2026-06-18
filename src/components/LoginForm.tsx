"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginForm({ error: initialError }: { error?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const router = typeof window !== "undefined" ? null : null;

  const getErrorMessage = (code: string) => {
    if (code === "InvalidCredentials")
      return "The email or password you entered is incorrect.";
    if (code === "MissingCredentials")
      return "Please enter both an email and password.";
    if (code === "InternalServerError")
      return "A server error occurred. Please try again.";
    return "An unexpected error occurred. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      const url = new URL(res.url);
      const errorParam = url.searchParams.get("error");

      if (errorParam) {
        setError(errorParam);
        setLoading(false);
      } else if (res.ok) {
        window.location.href = res.url;
      } else {
        setError("InternalServerError");
        setLoading(false);
      }
    } catch {
      setError("InternalServerError");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Sign in to the admin portal
        </p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          {getErrorMessage(error)}
        </div>
      )}

      <form
        className="space-y-4"
        action="/api/admin/login"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={loading}
            className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 transition-all disabled:opacity-50"
            placeholder="admin@michaelsoft.co.ke"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={loading}
            className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 transition-all disabled:opacity-50"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2.5 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
