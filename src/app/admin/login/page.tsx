import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="animate-pulse bg-white dark:bg-neutral-900 rounded-xl w-full max-w-sm h-[320px]" />
        }
      >
        <LoginForm error={params?.error} />
      </Suspense>
    </div>
  );
}
