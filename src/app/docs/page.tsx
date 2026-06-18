"use client";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-800 p-6 md:p-8 md:sticky md:top-0 md:h-screen">
        <div className="mb-8">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            MichaelSoft
          </span>
          <span className="text-neutral-300 dark:text-neutral-600 mx-2">
            /
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Docs
          </span>
        </div>

        <nav className="space-y-6">
          <div>
            <h4 className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-2">
              Getting Started
            </h4>
            <ul className="space-y-1">
              <li>
                <span className="text-sm text-neutral-900 dark:text-neutral-100 font-medium cursor-default">
                  Quickstart
                </span>
              </li>
              <li>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer">
                  Architecture
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-2">
              Core Modules
            </h4>
            <ul className="space-y-1">
              <li>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer">
                  Nebula OS
                </span>
              </li>
              <li>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer">
                  Data Sync
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 md:p-16 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
          Documentation
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base mb-12">
          Technical specifications and implementation guides for the
          MichaelSoft ecosystem.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Introduction
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              MichaelSoft is building a unified digital substrate. Our
              documentation provides the primitives needed to integrate with our
              upcoming infrastructure.
            </p>
          </section>

          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              This documentation is currently in pre-alpha. Specifications are
              subject to change as the infrastructure matures.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Core Philosophy
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              We believe software should be as resilient as biological systems.
              Every module in the MichaelSoft stack is designed with:
            </p>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                Self-healing capabilities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                Atmospheric scalability
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                Invisible synchronization
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
