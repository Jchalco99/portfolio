"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  isLocale,
  LOCALES,
  LOCALE_COOKIE_NAME,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/cn";
import { SPRING_SNAPPY } from "@/lib/motion";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  ariaLabel: string;
  idPrefix?: string;
}

function buildLocalizedHref(pathname: string | null, targetLocale: Locale): string {
  if (!pathname || pathname === "/") {
    return `/${targetLocale}`;
  }

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (maybeLocale && isLocale(maybeLocale)) {
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function writeLocaleCookie(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * Bilingual ES | EN pill route switcher preserving the active subpath
 * and persisting the selected locale preference in a first-party cookie.
 */
export function LanguageSwitcher({
  currentLocale,
  ariaLabel,
  idPrefix = "header",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav
      aria-label={ariaLabel}
      className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-[#08090B]/70 p-1"
    >
      {LOCALES.map((locale, index) => {
        const isActive = locale === currentLocale;
        const href = buildLocalizedHref(pathname, locale);

        return (
          <Fragment key={locale}>
            <Link
              href={href}
              hrefLang={locale}
              scroll={false}
              prefetch={true}
              aria-current={isActive ? "page" : undefined}
              onClick={() => writeLocaleCookie(locale)}
              className={cn(
                "relative inline-flex min-h-[34px] min-w-[38px] items-center justify-center rounded-full px-3 font-mono text-xs tracking-wider uppercase transition-colors duration-150",
                isActive
                  ? "font-bold text-accent-fg"
                  : "font-medium text-text-muted hover:text-text-primary"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`${idPrefix}-active-locale-pill`}
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-accent"
                />
              )}
              <span className="relative z-10">{locale.toUpperCase()}</span>
            </Link>
            {index < LOCALES.length - 1 && (
              <span
                aria-hidden="true"
                className="select-none px-0.5 font-mono text-[11px] text-white/20"
              >
                |
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
