import React from 'react';
import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';
import InteractiveDots from '@/components/InteractiveDots';

// Using Suspense boundaries because we access query parameters

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafafa] relative overflow-hidden font-sans">
      {/* Interactive dot pattern that scatters on mouse hover */}
      <InteractiveDots />
      
      <div className="relative z-10 w-full flex justify-center p-4">
        <Suspense fallback={<div className="animate-pulse bg-white rounded-2xl w-full max-w-md h-[400px]" />}>
          <LoginForm error={params?.error} />
        </Suspense>
      </div>
    </div>
  );
}

