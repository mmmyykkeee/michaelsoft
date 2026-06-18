"use client";

export default function ProcurementPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <nav className="border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            MichaelSoft
          </span>
        </div>
      </nav>

      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
            Supply Chain
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
            Procurement
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed mb-12 max-w-2xl">
            The MichaelSoft Procurement Terminal integrates global inventory
            channels with automated logistics fulfillment. Currently scaling
            clusters in East Africa nodes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Core Modules
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-neutral-400" />
                  Inventory Management
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-neutral-400" />
                  Vendor Reconciliation
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-400 dark:text-neutral-600">
                  <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  Predictive Logistics (Coming Soon)
                </li>
              </ul>
            </div>

            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Secure Portal
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                Administrative access required to manage procurement schemas.
              </p>
              <button className="w-full px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.97] transition-all duration-200 cursor-pointer">
                Request Access
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
