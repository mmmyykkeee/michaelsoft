"use client";

export default function StatusPage() {
  const systems = [
    { name: "API Gateway", status: "Operational", uptime: "99.98%" },
    { name: "Cloud Databases", status: "Operational", uptime: "100%" },
    { name: "Edge Caching", status: "Operational", uptime: "99.99%" },
    { name: "CI/CD Pipeline", status: "Operational", uptime: "100%" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <nav className="border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            MichaelSoft
          </span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              All Systems Operational
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
            System Status
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
            Real-time metrics of the MichaelSoft infrastructure.
          </p>

          <div className="space-y-px bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
            {systems.map((sys) => (
              <div
                key={sys.name}
                className="flex items-center justify-between px-5 py-4 bg-white dark:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {sys.name}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                    {sys.uptime}
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {sys.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-neutral-400 dark:text-neutral-500">
            Last updated: {new Date().toLocaleTimeString()} (UTC)
          </p>
        </div>
      </main>
    </div>
  );
}
