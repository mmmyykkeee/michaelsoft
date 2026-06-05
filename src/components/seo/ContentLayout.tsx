import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { contactLinks, siteConfig } from "@/lib/seo/config";
import { sw } from "@/lib/i18n/sw";

const defaultNav = [
  { href: "/services", label: "Services" },
  { href: "/procurement", label: "Procurement" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights", label: "Insights" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const swNav = [
  { href: "/sw/services", label: sw.nav.services },
  { href: "/sw/procurement", label: sw.nav.procurement },
  { href: "/sw/case-studies", label: sw.nav.caseStudies },
  { href: "/sw/insights", label: sw.nav.insights },
  { href: "/sw/about", label: sw.nav.about },
  { href: "/sw/contact", label: sw.nav.contact },
];

type ContentLayoutProps = {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  locale?: "en" | "sw";
  currentPath?: string;
};

export default function ContentLayout({
  children,
  breadcrumbs,
  locale = "en",
  currentPath = "/",
}: ContentLayoutProps) {
  const isSw = locale === "sw";
  const navLinks = isSw ? swNav : defaultNav;
  const homeHref = isSw ? "/sw" : "/";
  const homeLabel = isSw ? sw.nav.home : "Home";

  return (
    <div className="min-h-screen text-slate-200 font-body relative">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f13]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <Link href={homeHref} className="flex items-center gap-3 group no-underline">
            <div className="w-7 h-7 rounded-[10px] bg-[url('/michaelsoft_bg_new.png')] bg-cover bg-center border border-white/10" />
            <span className="font-headline font-bold text-[0.7rem] tracking-widest text-white group-hover:text-primary transition-colors">
              {siteConfig.name}
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSwitcher currentPath={currentPath} />
            <nav aria-label="Main">
              <ul className="flex flex-wrap gap-4 md:gap-6 list-none">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.65rem] font-headline tracking-widest text-white/60 hover:text-primary transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.65rem] tracking-widest text-white/40 font-headline">
            <ol className="flex flex-wrap gap-2 list-none">
              <li>
                <Link href={homeHref} className="hover:text-primary no-underline text-white/50">
                  {homeLabel}
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex gap-2 items-center">
                  <span aria-hidden>/</span>
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-primary no-underline text-white/50">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {children}
      </main>

      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-[0.65rem] tracking-widest text-white/40 font-headline">
          <div>
            <p className="text-white/60 mb-2">{siteConfig.name}</p>
            <p>{isSw ? sw.home.lead.slice(0, 120) + "…" : siteConfig.tagline}</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={contactLinks.whatsapp} className="hover:text-primary no-underline text-white/50">
              WhatsApp
            </a>
            <a href={contactLinks.tel} className="hover:text-primary no-underline text-white/50">
              {siteConfig.phone}
            </a>
            <a href={contactLinks.email} className="hover:text-primary no-underline text-white/50">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="mb-12">
      {eyebrow && (
        <p className="text-[#00ff88] text-[0.6rem] font-bold tracking-[0.3em] mb-4 uppercase">{eyebrow}</p>
      )}
      <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">{title}</h1>
      <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl">{lead}</p>
    </header>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-content text-slate-300 text-sm md:text-base leading-relaxed space-y-6 [&_h2]:font-headline [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-headline [&_h3]:text-lg [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline [&_strong]:text-white">
      {children}
    </div>
  );
}

export function CtaBand({ locale = "en" }: { locale?: "en" | "sw" }) {
  const isSw = locale === "sw";
  return (
    <div className="mt-16 p-8 rounded-2xl border border-primary/20 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.08)_0%,transparent_70%)] text-center">
      <h2 className="font-headline text-lg font-bold text-white mb-3">
        {isSw ? "Anzisha mazungumzo ya ugunduzi" : "Start a discovery conversation"}
      </h2>
      <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
        {isSw
          ? "Tuambie kuhusu programu, wakala wa AI, au malengo ya udigitalishaji wa ununuzi nchini Kenya."
          : "Tell us about your software, AI agent, or procurement digitization goals in Kenya."}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-black font-headline font-bold px-6 py-3 rounded-lg text-[0.65rem] tracking-widest hover:bg-white transition-all no-underline"
        >
          WhatsApp MichaelSoft
        </a>
        <Link
          href={isSw ? "/sw/contact" : "/contact"}
          className="inline-block border border-white/20 text-white font-headline font-bold px-6 py-3 rounded-lg text-[0.65rem] tracking-widest hover:border-primary transition-all no-underline"
        >
          {isSw ? sw.nav.contact : "Contact page"}
        </Link>
      </div>
    </div>
  );
}
