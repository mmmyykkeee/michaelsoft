import Link from "next/link";
import { enPathBySw, swPathByEn } from "@/lib/i18n/sw";

type LanguageSwitcherProps = {
  currentPath: string;
};

export default function LanguageSwitcher({ currentPath }: LanguageSwitcherProps) {
  const isSw = currentPath.startsWith("/sw");
  const enHref = isSw ? (enPathBySw[currentPath] ?? "/") : currentPath || "/";
  const swHref = isSw ? currentPath : (swPathByEn[currentPath] ?? "/sw");

  return (
    <div className="flex gap-2 text-[0.6rem] font-headline tracking-widest items-center">
      <Link
        href={enHref}
        className={!isSw ? "text-primary no-underline" : "text-white/40 hover:text-white no-underline"}
        hrefLang="en-KE"
      >
        EN
      </Link>
      <span className="text-white/20" aria-hidden>
        |
      </span>
      <Link
        href={swHref}
        className={isSw ? "text-primary no-underline" : "text-white/40 hover:text-white no-underline"}
        hrefLang="sw-KE"
      >
        SW
      </Link>
    </div>
  );
}
