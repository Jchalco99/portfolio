"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { DownloadSimple, List, X } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { getCvAsset } from "@/lib/cv";
import { EASE_PRECISE, SPRING_SNAPPY } from "@/lib/motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

type SectionId = "stack" | "projects" | "contact";

const SECTION_IDS: readonly SectionId[] = ["stack", "projects", "contact"];

interface SiteHeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
  cv: Dictionary["cv"];
  profile: {
    name: string;
    monogram: string;
    role: string;
  };
}

/**
 * Organic rounded header that spans cleanly at scroll top and contracts into
 * a floating translucent pill capsule on scroll.
 */
export function SiteHeader({ locale, nav, cv, profile }: SiteHeaderProps) {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [isContactInView, setIsContactInView] = useState(false);

  const isMobileMenuOpen = openForPath === pathname;
  const isHomePage = pathname === `/${locale}`;
  const displayedActiveSection = isHomePage ? activeSection : null;
  const showHeaderCvCta = isHomePage
    ? isScrolled && !isContactInView && activeSection !== "contact"
    : true;

  const cvAsset = getCvAsset(locale);
  const cvDrawerLabel = locale === "es" ? cv.downloadEs : cv.downloadEn;

  const navItems: readonly { id: SectionId; label: string; href: string }[] = [
    { id: "stack", label: nav.stack, href: `/${locale}#stack` },
    { id: "projects", label: nav.projects, href: `/${locale}#projects` },
    { id: "contact", label: nav.contact, href: `/${locale}#contact` },
  ];

  const closeMobileMenu = useCallback(() => {
    setOpenForPath(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setOpenForPath((prev) => (prev === pathname ? null : pathname));
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 40;
    setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    if (isHomePage && latest < 140) {
      setActiveSection(null);
      setIsContactInView(false);
    }
  });

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      const initialY = window.scrollY;
      setIsScrolled(initialY > 40);
      if (isHomePage && initialY < 140) {
        setActiveSection(null);
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null
    );

    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 140) {
          return;
        }

        const contactRect = document
          .getElementById("contact")
          ?.getBoundingClientRect();
        if (contactRect && contactRect.top < window.innerHeight * 0.85) {
          setActiveSection("contact");
          return;
        }

        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (intersecting.length > 0) {
          const matchedId = intersecting[0].target.id as SectionId;
          setActiveSection(matchedId);
        }
      },
      {
        rootMargin: "-22% 0px -60% 0px",
        threshold: 0,
      }
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [isHomePage, pathname]);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const contactEl = document.getElementById("contact");
    if (!contactEl) {
      return;
    }

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        const inView = entry.isIntersecting;
        setIsContactInView(inView);
        if (inView) {
          setActiveSection("contact");
        } else if (window.scrollY >= 140) {
          setActiveSection((prev) => (prev === "contact" ? "projects" : prev));
        }
      },
      {
        threshold: 0.15,
      }
    );

    contactObserver.observe(contactEl);
    return () => contactObserver.disconnect();
  }, [isHomePage, pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenForPath(null);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpenForPath(null);
      }
    };

    desktopQuery.addEventListener("change", handleMediaChange);
    return () => desktopQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const containerTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 28 };

  const pillSpring = shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-accent-fg"
      >
        {nav.skipToContent}
      </a>

      <header className="pointer-events-none sticky top-0 z-40 flex h-[72px] items-center px-3 sm:px-6">
        <motion.div
          initial={false}
          animate={{
            maxWidth: isScrolled ? 920 : 1152,
            y: isScrolled ? 6 : 0,
            borderRadius: isScrolled ? 9999 : 16,
          }}
          transition={containerTransition}
          className={cn(
            "pointer-events-auto relative mx-auto w-full overflow-hidden border transition-[background-color,border-color,box-shadow,padding] duration-300",
            isScrolled
              ? "surface-nav border-white/10 px-3.5 py-2 sm:px-5"
              : "border-transparent bg-[#08090B]/80 px-2 py-2 backdrop-blur-sm sm:px-4"
          )}
        >
          <div className="flex h-11 items-center justify-between gap-3">
            <Link
              href={`/${locale}`}
              aria-label={nav.homeAriaLabel}
              onClick={() => {
                closeMobileMenu();
                setActiveSection(null);
              }}
              className="group inline-flex min-h-[42px] min-w-0 shrink-0 items-center gap-2.5 rounded-full pr-2"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 font-mono text-xs font-semibold tracking-wider text-accent transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                {profile.monogram}
              </span>
              <span className="truncate font-display text-base font-bold uppercase tracking-wide text-text-primary sm:text-lg">
                {profile.name}
              </span>
            </Link>

            <div className="flex items-center gap-2.5 lg:gap-4">
              <nav
                aria-label={nav.primaryNavLabel}
                className="hidden items-center gap-1 lg:flex"
              >
                {navItems.map((item) => {
                  const isActive = displayedActiveSection === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative inline-flex min-h-[38px] items-center rounded-full px-3.5 text-sm transition-colors duration-150",
                        isActive
                          ? "font-semibold text-text-primary"
                          : "font-medium text-text-muted hover:bg-white/5 hover:text-text-primary"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="header-active-nav-pill"
                          transition={pillSpring}
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-accent/35 bg-accent/15"
                        >
                          <span className="absolute bottom-1 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.85)]" />
                        </motion.span>
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden items-center md:flex">
                <LanguageSwitcher
                  currentLocale={locale}
                  ariaLabel={nav.languageSwitcherLabel}
                  idPrefix="desktop-header"
                />

                <AnimatePresence initial={false}>
                  {showHeaderCvCta && (
                    <motion.div
                      key="header-cv-cta"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, scale: 0.9, width: 0 }
                      }
                      animate={{ opacity: 1, scale: 1, width: "auto" }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.9, width: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.22, ease: EASE_PRECISE }
                      }
                      className="overflow-hidden"
                    >
                      <div className="pl-2.5 pr-1">
                        <motion.a
                          href={cvAsset.href}
                          download={cvAsset.downloadName}
                          whileHover={
                            shouldReduceMotion ? undefined : { scale: 1.03 }
                          }
                          whileTap={
                            shouldReduceMotion ? undefined : { scale: 0.97 }
                          }
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 24 }
                          }
                          className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4.5 text-xs font-bold tracking-wide text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] transition-colors duration-150 hover:bg-accent-hover"
                        >
                          <DownloadSimple
                            size={15}
                            weight="bold"
                            aria-hidden="true"
                          />
                          <span>{cv.ctaShort}</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={isMobileMenuOpen ? nav.menuCloseLabel : nav.menuOpenLabel}
                onClick={toggleMobileMenu}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-white/10 bg-surface/90 px-3.5 text-xs font-medium text-text-primary transition-[background-color,border-color] duration-150 hover:border-accent/40 hover:bg-elevated lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X size={16} weight="bold" aria-hidden="true" />
                ) : (
                  <List size={16} weight="bold" aria-hidden="true" />
                )}
                <span>{isMobileMenuOpen ? nav.closeLabel : nav.menuLabel}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.16, ease: EASE_PRECISE }
              }
              aria-hidden="true"
              onClick={closeMobileMenu}
              className="fixed inset-0 z-30 bg-canvas/75 backdrop-blur-xs lg:hidden"
            />

            <motion.div
              key="mobile-drawer-panel"
              id="mobile-navigation-drawer"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.2, ease: EASE_PRECISE }
              }
              className={cn(
                "fixed inset-x-3 z-40 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0E1116]/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-6 lg:hidden",
                isScrolled ? "top-[78px]" : "top-[74px]"
              )}
            >
              <nav
                aria-label={nav.primaryNavLabel}
                className="flex flex-col gap-1.5"
              >
                {navItems.map((item) => {
                  const isActive = displayedActiveSection === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex min-h-[46px] items-center justify-between rounded-xl px-4 text-sm transition-colors duration-150",
                        isActive
                          ? "border border-accent/35 bg-accent/15 font-semibold text-text-primary"
                          : "font-medium text-text-muted hover:bg-white/5 hover:text-text-primary"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.85)]"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 space-y-3 border-t border-white/10 pt-4 md:hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs text-text-muted">
                    {nav.languageSwitcherLabel}
                  </span>
                  <LanguageSwitcher
                    currentLocale={locale}
                    ariaLabel={nav.languageSwitcherLabel}
                    idPrefix="mobile-drawer"
                  />
                </div>

                <a
                  href={cvAsset.href}
                  download={cvAsset.downloadName}
                  onClick={closeMobileMenu}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] transition-colors duration-150 hover:bg-accent-hover"
                >
                  <DownloadSimple size={17} weight="bold" aria-hidden="true" />
                  <span>{cvDrawerLabel}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
