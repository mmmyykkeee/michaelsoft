"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3002";

const getSubdomainUrl = (subdomain: string) => {
  const isDev = process.env.NODE_ENV === "development";
  const protocol = isDev ? "http" : "https";

  if (typeof window !== "undefined") {
    const { hostname, port } = window.location;
    const isIP = /^[0-9.]+$/.test(hostname);
    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local");

    if (isLocalhost || isIP) {
      if (isIP) {
        return `http://${hostname}${port ? `:${port}` : ""}/${subdomain}`;
      }
      return `${protocol}://${subdomain}.${hostname}${port ? `:${port}` : ""}`;
    }
  }

  if (isDev) {
    return `${protocol}://${subdomain}.localhost:3002`;
  }
  return `https://${subdomain}.${ROOT_DOMAIN}`;
};

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const desktopContactRef = useRef<HTMLDivElement>(null);
  const mobileContactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        (desktopContactRef.current &&
          desktopContactRef.current.contains(target)) ||
        (mobileContactRef.current && mobileContactRef.current.contains(target))
      ) {
        return;
      }
      setContactOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/michaelsoft_bg_new.png"
              alt="MichaelSoft"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              MichaelSoft
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              Projects
            </Link>
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 cursor-pointer relative"
            >
              Contact
              <div
                ref={desktopContactRef}
                className={`absolute top-[calc(100%+0.75rem)] right-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2 min-w-[200px] shadow-lg transition-all duration-200 ${
                  contactOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                }`}
              >
                <a
                  href="tel:+254704472009"
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call
                </a>
                <a
                  href="mailto:0mykembugua@gmail.com"
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Email
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=254704472009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
            MichaelSoft
          </h1>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Coming Soon
          </p>
          <p className="mt-5 text-neutral-500 dark:text-neutral-400 text-base leading-relaxed max-w-xl mx-auto">
            We&apos;re architecting the next generation of digital
            infrastructure. A new era of MichaelSoft is surfacing.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.97] transition-all duration-200"
            >
              View Projects
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="px-5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-600 active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-100 dark:border-neutral-800 py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
          <span>MICHAELSOFT</span>
          <span>&copy; {new Date().getFullYear()} MichaelSoft. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
