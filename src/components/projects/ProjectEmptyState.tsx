import Link from "next/link";
import { ArrowRight, FolderOpen } from "@phosphor-icons/react/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface ProjectEmptyStateProps {
  locale: Locale;
  copy: Dictionary["projects"];
}

const PREVIEW_TECH_CHIPS = [
  { name: "C#", color: "#A855F7" },
  { name: ".NET", color: "#8B5CF6" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "SQL Server", color: "#F87171" },
] as const;

/**
 * Framed horizontal empty state shown when no published projects exist in
 * `src/content/projects/index.ts`, matching the alternating row architecture.
 */
export function ProjectEmptyState({ locale, copy }: ProjectEmptyStateProps) {
  return (
    <article className="relative overflow-hidden rounded-[4px] border border-accent-border/45 bg-[#0E1116] p-5 sm:p-7">
      {/* Architectural backdrop grid, 45-degree corner traces, and corner brackets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <svg
          viewBox="0 0 88 88"
          fill="none"
          className="absolute right-0 top-0 h-14 w-14 sm:h-16 sm:w-16"
        >
          <polyline
            points="24,0 88,64 88,88"
            stroke="#2A3441"
            strokeOpacity="0.8"
            strokeWidth="1"
          />
          <line
            x1="48"
            y1="0"
            x2="88"
            y2="40"
            stroke="#06B6D4"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </svg>

        <svg
          viewBox="0 0 88 88"
          fill="none"
          className="absolute bottom-0 left-0 h-14 w-14 sm:h-16 sm:w-16"
        >
          <polyline
            points="0,24 64,88 0,88"
            stroke="#2A3441"
            strokeOpacity="0.65"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="48"
            x2="40"
            y2="88"
            stroke="#06B6D4"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </svg>

        <span className="absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-[#22D3EE]" />
        <span className="absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-accent-border" />
        <span className="absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-accent-border" />
        <span className="absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-[#22D3EE]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Visual architecture preview slot */}
        <div className="lg:col-span-5">
          <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-[4px] border border-[#1E2530] bg-[#08090B] p-4 sm:p-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-2 border-b border-[#1E2530] pb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                {copy.architectureTitle}
              </span>
              <span className="font-mono text-[11px] text-[#94A3B8]">
                public/projects/&lt;slug&gt;/
              </span>
            </div>

            <div className="relative z-10 my-auto flex flex-wrap items-center justify-center gap-2 py-3 sm:gap-2.5">
              <div className="rounded-[4px] border border-[#3178C6]/50 bg-[#0E1116] px-3 py-2 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#61DAFB]">
                  Client
                </p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-[#F8FAFC]">
                  React / TS
                </p>
              </div>

              <span aria-hidden="true" className="font-mono text-xs text-accent">
                ⇄
              </span>

              <div className="rounded-[4px] border border-[#A855F7]/50 bg-[#0E1116] px-3 py-2 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#A855F7]">
                  API
                </p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-[#F8FAFC]">
                  C# / .NET
                </p>
              </div>

              <span aria-hidden="true" className="font-mono text-xs text-accent">
                ⇄
              </span>

              <div className="rounded-[4px] border border-[#F87171]/45 bg-[#0E1116] px-3 py-2 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#F87171]">
                  Data
                </p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-[#F8FAFC]">
                  SQL
                </p>
              </div>
            </div>

            <p className="relative z-10 truncate border-t border-[#1E2530] pt-2 font-mono text-[11px] text-[#94A3B8]">
              {copy.emptyHint}
            </p>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-accent/70"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-accent/70"
            />
          </div>
        </div>

        {/* Direct status copy and primary contact CTA */}
        <div className="space-y-4 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-[4px] border border-[#1E2530] bg-[#08090B] px-3 py-1 font-mono text-xs text-[#CBD5E1]">
            <FolderOpen size={15} className="text-accent" aria-hidden="true" />
            <span>{copy.emptyStatusBadge}</span>
          </div>

          <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F8FAFC] sm:text-3xl">
            {copy.emptyTitle}
          </h3>

          <p className="max-w-[56ch] text-sm leading-relaxed text-[#CBD5E1] text-pretty sm:text-base">
            {copy.emptyDescription}
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {PREVIEW_TECH_CHIPS.map((chip) => (
              <li
                key={chip.name}
                className="inline-flex items-center gap-2 rounded-[4px] border border-[#1E2530] bg-[#08090B] px-2.5 py-1 font-mono text-xs text-[#CBD5E1]"
              >
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: chip.color }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                />
                <span>{chip.name}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Link
              href={`/${locale}#contact`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 text-xs font-bold tracking-wide text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.98]"
            >
              <span>{copy.emptyContactCta}</span>
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
