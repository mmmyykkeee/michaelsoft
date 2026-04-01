"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm({ error: initialError }: { error?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const router = useRouter();

  const getErrorMessage = (code: string) => {
    if (code === 'InvalidCredentials') return 'The email or password you entered is incorrect.';
    if (code === 'MissingCredentials') return 'Please enter both an email and password.';
    if (code === 'InternalServerError') return 'A server error occurred. Please try again.';
    return 'An unexpected error occurred. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // Let the form submit naturally as it points to an API route that handles redirects.
    // However, if we want to show loading during the redirect/action, we can't easily do it with a standard POST
    // unless we use fetch.
    // Let's use fetch instead for a better UX.
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
        redirect: "follow"
      });
      
      // If the fetch followed a redirect, check if it ended up on an error page or a success page.
      const url = new URL(res.url);
      const errorParam = url.searchParams.get("error");
      
      if (errorParam) {
        setError(errorParam);
        setLoading(false);
      } else if (res.ok) {
        // Redirection was successful (usually it ends at /admin or /)
        window.location.href = res.url;
      } else {
        setError("InternalServerError");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("InternalServerError");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-neutral-200/60 shadow-xl rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden">
      {/* Decorative gradient blur in the background of the card */}
      <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -m-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-500">
            Secure admin portal of Michaelsoft.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-medium flex items-center gap-3 animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {getErrorMessage(error)}
          </div>
        )}

        <form className="space-y-4" action="/api/admin/login" method="POST" onSubmit={handleSubmit}>
           <div className="space-y-2">
            <label className="text-sm font-medium text-[#000000]" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              className="w-full text-base xl:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-black duration-200 placeholder:text-gray-500 text-[#000000] disabled:opacity-50"
              style={{ color: '#000000', opacity: 1 }}
              placeholder="admin@michaelsoft.co.ke"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-neutral-700" htmlFor="password">
                Password
              </label>
              <Link href="#" className="text-xs text-[#000000] hover:text-purple-700 font-medium">
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
              className="w-full text-base xl:text-sm px-4 py-3 text-[#000000] rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-black duration-200 placeholder:text-gray-500 disabled:opacity-50"
              style={{ color: '#000000', opacity: 1 }}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-neutral-900/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
