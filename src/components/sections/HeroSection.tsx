import Link from "next/link";
import {
  ArrowRight,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
} from "@phosphor-icons/react/ssr";
import { PROFILE } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getCvAsset } from "@/lib/cv";
import { HeroBackground } from "./HeroBackground";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const HERO_TECH_BADGES = ["C#", "JavaScript", "TypeScript", "React"] as const;

/**
 * Two-column Fullstack hero section on deep black canvas featuring localized
 * C#/.NET and JS/TS/React positioning, primary CTAs, and a portrait container
 * with subtle geometric SVG linework.
 */
export function HeroSection({ locale, dict }: HeroSectionProps) {
  const cvAsset = getCvAsset(locale);
  const { github, linkedin } = PROFILE.links;
  const hasDirectLinks = Boolean(github || linkedin || PROFILE.email);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-canvas"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 md:pt-16 md:pb-16 lg:px-8 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-[4px] bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-fg">
                {dict.hero.greetingBadge}
              </span>

              {PROFILE.location && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  <MapPin size={13} aria-hidden="true" />
                  <span>{PROFILE.location[locale]}</span>
                </span>
              )}
            </div>

            <h1
              id="hero-heading"
              className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
            >
              {PROFILE.name}
            </h1>

            <div className="space-y-3">
              <p className="text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                {PROFILE.role[locale]}
              </p>

              <p className="max-w-[54ch] text-base leading-relaxed text-text-secondary sm:text-[17px]">
                {dict.hero.rolePrefix}. {dict.hero.subheadline}
              </p>

              <ul
                aria-label={dict.stack.technologiesLabel}
                className="flex flex-wrap items-center gap-2 pt-1"
              >
                {HERO_TECH_BADGES.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-[4px] border border-border-subtle bg-surface px-2.5 py-1 font-mono text-xs text-text-secondary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={cvAsset.href}
                download={cvAsset.downloadName}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-accent-fg shadow-[0_4px_20px_-4px_rgba(6,182,212,0.45)] transition-[background-color,transform,box-shadow] duration-150 hover:bg-accent-hover active:scale-[0.98]"
              >
                <DownloadSimple size={17} weight="bold" aria-hidden="true" />
                <span>{dict.hero.downloadCvCta}</span>
              </a>

              <Link
                href={`/${locale}#projects`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#334155] bg-surface/75 px-6 text-sm font-medium text-text-primary backdrop-blur-xs transition-[border-color,background-color,transform] duration-150 hover:border-accent-border hover:bg-surface active:scale-[0.98]"
              >
                <span>{dict.hero.viewProjectsCta}</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </div>

            {hasDirectLinks && (
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border border-border-subtle bg-surface px-3.5 text-xs font-medium text-text-secondary transition-[border-color,color,background-color] duration-150 hover:border-accent-border hover:bg-elevated hover:text-text-primary"
                  >
                    <GithubLogo size={16} aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border border-border-subtle bg-surface px-3.5 text-xs font-medium text-text-secondary transition-[border-color,color,background-color] duration-150 hover:border-accent-border hover:bg-elevated hover:text-text-primary"
                  >
                    <LinkedinLogo size={16} aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {PROFILE.email && (
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border border-border-subtle bg-surface px-3.5 text-xs font-medium text-text-secondary transition-[border-color,color,background-color] duration-150 hover:border-accent-border hover:bg-elevated hover:text-text-primary"
                  >
                    <EnvelopeSimple size={16} aria-hidden="true" />
                    <span>{PROFILE.email}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0 lg:max-w-[460px]">
              {/* Subtle architectural mesh lines extending outside the frame */}
              <svg
                aria-hidden="true"
                viewBox="0 0 460 560"
                fill="none"
                className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] sm:-inset-6 sm:h-[calc(100%+3rem)] sm:w-[calc(100%+3rem)]"
              >
                <path
                  d="M24 92 L92 24 L378 24 L436 88"
                  stroke="#2A3441"
                  strokeWidth="1"
                />
                <path
                  d="M436 456 L368 536 L86 536 L24 472"
                  stroke="#2A3441"
                  strokeWidth="1"
                />
                <path
                  d="M14 176 L72 118 L72 44"
                  stroke="#06B6D4"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <path
                  d="M446 374 L388 432 L388 516"
                  stroke="#06B6D4"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <polygon
                  points="396,16 444,16 444,64"
                  stroke="#06B6D4"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <polygon
                  points="16,496 64,544 16,544"
                  stroke="#2A3441"
                  strokeWidth="1"
                />
                <circle cx="92" cy="24" r="2.5" fill="#06B6D4" fillOpacity="0.5" />
                <circle cx="388" cy="432" r="2.5" fill="#06B6D4" fillOpacity="0.5" />
              </svg>

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] border border-border-subtle bg-surface">
                {PROFILE.heroImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={PROFILE.heroImage}
                    alt={`${PROFILE.name} — ${dict.hero.imageAlt}`}
                    className="h-full w-full object-cover object-top grayscale contrast-115"
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 88 88"
                        fill="none"
                        className="h-20 w-20"
                      >
                        <rect
                          x="6"
                          y="6"
                          width="76"
                          height="76"
                          rx="4"
                          stroke="#2A3441"
                          strokeWidth="1.2"
                        />
                        <circle
                          cx="44"
                          cy="33"
                          r="12"
                          stroke="#06B6D4"
                          strokeOpacity="0.7"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M22 69 C22 56.85 31.85 49 44 49 C56.15 49 66 56.85 66 69"
                          stroke="#06B6D4"
                          strokeOpacity="0.7"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6 20 L20 6 M68 6 L82 20 M6 68 L20 82 M68 82 L82 68"
                          stroke="#2A3441"
                          strokeWidth="1"
                        />
                      </svg>

                      <div className="space-y-2">
                        <p className="font-display text-lg font-semibold uppercase tracking-wider text-text-primary">
                          {dict.hero.imagePlaceholderTitle}
                        </p>
                        <p className="inline-block rounded-[4px] border border-accent-border/70 bg-canvas/90 px-3 py-1 font-mono text-xs text-accent">
                          {dict.hero.imagePlaceholderPath}
                        </p>
                        <p className="mx-auto max-w-[30ch] text-xs leading-relaxed text-text-muted">
                          {dict.hero.imagePlaceholderHint}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtle foreground geometric line overlay along perimeter */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 500"
                  fill="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  <line
                    x1="0"
                    y1="72"
                    x2="72"
                    y2="0"
                    stroke="#06B6D4"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  />
                  <line
                    x1="328"
                    y1="500"
                    x2="400"
                    y2="428"
                    stroke="#06B6D4"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  />
                  <polyline
                    points="300,0 400,100 400,160"
                    stroke="#2A3441"
                    strokeOpacity="0.75"
                    strokeWidth="1"
                  />
                  <polyline
                    points="0,340 0,400 100,500"
                    stroke="#2A3441"
                    strokeOpacity="0.75"
                    strokeWidth="1"
                  />
                </svg>

                {/* Crisp corner brackets */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 border-l-2 border-t-2 border-accent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 border-r-2 border-t-2 border-accent-border"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-accent-border"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b-2 border-r-2 border-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
