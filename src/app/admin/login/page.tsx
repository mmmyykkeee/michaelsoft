import React from 'react';
import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';

// Using Suspense boundaries because we access query parameters

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafafa] relative overflow-hidden font-sans">
      {/* Abstract Background Elements for Premium Feel */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative z-10 w-full flex justify-center p-4">
        <Suspense fallback={<div className="animate-pulse bg-white rounded-2xl w-full max-w-md h-[400px]" />}>
          <LoginForm error={params?.error} />
        </Suspense>
      </div>
    </div>
  );
}

