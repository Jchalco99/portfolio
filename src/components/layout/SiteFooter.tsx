"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { PROFILE } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface SiteFooterProps {
  locale?: Locale;
  dict: Dictionary;
}

/**
 * Minimalist single-row footer displaying identity copyright, concise stack
 * signature, and a back-to-top anchor without duplicating header or contact links.
 */
export function SiteFooter({ dict }: SiteFooterProps) {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setCurrentYear(new Date().getFullYear());
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <footer className="border-t border-[#1E2530] bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-display text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]">
            © {currentYear} {PROFILE.name}
          </span>
          <span aria-hidden="true" className="text-[#2A3441]">
            /
          </span>
          <span className="font-mono text-xs text-[#94A3B8]">
            C# / .NET · React · TypeScript
          </span>
        </div>

        <a
          href="#top"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#1E2530] bg-[#0E1116] px-4 font-mono text-xs text-[#CBD5E1] transition-colors duration-150 hover:border-accent hover:text-[#22D3EE]"
        >
          <ArrowUp size={13} weight="bold" aria-hidden="true" />
          <span>{dict.footer.backToTop}</span>
        </a>
      </div>
    </footer>
  );
}
