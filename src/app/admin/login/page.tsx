import React from 'react';
import Link from 'next/link';
import { Suspense } from 'react';

// Using Suspense boundaries because we access query parameters

function LoginContent({ error }: { error?: string }) {
  // Map error codes to friendly messages
  const getErrorMessage = (code: string) => {
    if (code === 'InvalidCredentials') return 'The email or password you entered is incorrect.';
    if (code === 'MissingCredentials') return 'Please enter both an email and password.';
    if (code === 'InternalServerError') return 'A server error occurred. Please try again.';
    return 'An unexpected error occurred. Please try again.';
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

        <form className="space-y-4" action="/api/auth/callback" method="POST">
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
              className="w-full text-base xl:text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-black duration-200 placeholder:text-gray-500 text-[#000000]"
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
              className="w-full text-base xl:text-sm px-4 py-3 text-[#000000] rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-black duration-200 placeholder:text-gray-500"
              style={{ color: '#000000', opacity: 1 }}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-neutral-900/20 flex justify-center items-center gap-2"
            >
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafafa] relative overflow-hidden font-sans">
      {/* Abstract Background Elements for Premium Feel */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative z-10 w-full flex justify-center p-4">
        <Suspense fallback={<div className="animate-pulse bg-white rounded-2xl w-full max-w-md h-[400px]" />}>
          <LoginContent error={params?.error} />
        </Suspense>
      </div>
    </div>
  );
}
