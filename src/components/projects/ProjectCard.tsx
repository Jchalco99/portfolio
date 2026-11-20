"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GithubLogo, Globe } from "@phosphor-icons/react";
import type { ProjectEntry } from "@/content/projects/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { EASE_PRECISE } from "@/lib/motion";
import {
  collectProjectTechChips,
  FOCUS_BADGE_CLASSES,
} from "./project-meta";

interface ProjectCardProps {
  project: ProjectEntry;
  locale: Locale;
  copy: Dictionary["projects"];
  index?: number;
}

/**
 * Full-width alternating horizontal project row framed with architectural
 * corner brackets, media/diagram slot, brand-colored tech chips, and conditional
 * live demo / GitHub repository pill actions.
 */
export function ProjectCard({
  project,
  locale,
  copy,
  index = 0,
}: ProjectCardProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isReversed = index % 2 === 1;
  const rowNumber = String(index + 1).padStart(2, "0");

  const allChips = collectProjectTechChips(project.stack);
  const visibleChips = allChips.slice(0, 8);
  const hiddenChipCount = allChips.length - visibleChips.length;
  const previewNodes = project.architecture.nodes.slice(0, 4);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.36, delay: Math.min(index * 0.06, 0.24), ease: EASE_PRECISE }
      }
      className="group/card relative overflow-hidden rounded-[4px] border border-[#1E2530] bg-[#0E1116] p-5 transition-[border-color,box-shadow] duration-200 hover:border-accent-border hover:shadow-[0_14px_40px_-20px_rgba(6,182,212,0.28)] sm:p-7"
    >
      {/* Subtle architectural backdrop grid and 45-degree corner traces */}
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
          className={cn(
            "absolute top-0 h-14 w-14 sm:h-16 sm:w-16",
            isReversed ? "left-0 -scale-x-100" : "right-0"
          )}
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
          className={cn(
            "absolute bottom-0 h-14 w-14 sm:h-16 sm:w-16",
            isReversed ? "right-0 -scale-x-100" : "left-0"
          )}
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

        <span className="absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-[#22D3EE] transition-colors duration-200 group-hover/card:border-accent" />
        <span className="absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-accent-border transition-colors duration-200 group-hover/card:border-[#22D3EE]" />
        <span className="absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-accent-border transition-colors duration-200 group-hover/card:border-[#22D3EE]" />
        <span className="absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-[#22D3EE] transition-colors duration-200 group-hover/card:border-accent" />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Visual / Architecture Block */}
        <div
          className={cn(
            "lg:col-span-6",
            isReversed ? "lg:order-2" : "lg:order-1"
          )}
        >
          <Link
            href={`/${locale}/projects/${project.slug}`}
            aria-label={`${project.title[locale]} — ${copy.viewCaseStudy}`}
            className="group/media relative block aspect-[16/10] w-full overflow-hidden rounded-[4px] border border-[#1E2530] bg-[#08090B]"
          >
            {project.architecture.diagramSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.architecture.diagramSrc}
                alt={
                  project.architecture.diagramAlt?.[locale] ??
                  project.title[locale]
                }
                className="h-full w-full object-cover transition-transform duration-300 group-hover/media:scale-[1.02]"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col justify-between p-4 sm:p-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between gap-2 border-b border-[#1E2530] pb-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    {copy.architectureTitle}
                  </span>
                  <span className="font-mono text-[11px] text-[#94A3B8]">
                    /{project.slug}
                  </span>
                </div>

                {previewNodes.length > 0 ? (
                  <div className="relative z-10 my-auto grid grid-cols-2 gap-2.5 py-2">
                    {previewNodes.map((node) => (
                      <div
                        key={node.id}
                        className="rounded-[4px] border border-[#1E2530] bg-[#0E1116]/90 px-3 py-2"
                      >
                        <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                          {copy.architectureLayers[node.layer]}
                        </p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#F8FAFC]">
                          {node.label[locale]}
                        </p>
                        <p className="truncate font-mono text-[11px] text-[#94A3B8]">
                          {node.technology}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative z-10 my-auto text-center font-mono text-xs text-[#94A3B8]">
                    {project.architecture.overview[locale]}
                  </div>
                )}

                <p className="relative z-10 truncate font-mono text-[11px] text-[#94A3B8]">
                  {project.architecture.overview[locale]}
                </p>
              </div>
            )}

            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-accent/80"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 bottom-2 h-2.5 w-2.5 border-r border-b border-accent/80"
            />
          </Link>
        </div>

        {/* Content & Actions Block */}
        <div
          className={cn(
            "flex flex-col space-y-4 lg:col-span-6",
            isReversed ? "lg:order-1" : "lg:order-2"
          )}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs font-semibold tabular-nums text-accent">
              {rowNumber}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-[#2A3441]" />
            <span
              className={cn(
                "inline-flex items-center rounded-[4px] px-2.5 py-0.5 font-mono text-xs font-medium",
                FOCUS_BADGE_CLASSES[project.focus]
              )}
            >
              {copy.filters[project.focus]}
            </span>

            {project.featured && (
              <span className="rounded-[4px] border border-accent-border/50 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-[#22D3EE]">
                {copy.featuredLabel}
              </span>
            )}
          </div>

          <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F8FAFC] sm:text-3xl">
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="inline-block rounded-[4px] transition-colors duration-150 hover:text-[#22D3EE]"
            >
              {project.title[locale]}
            </Link>
          </h3>

          <p className="text-sm leading-relaxed text-[#CBD5E1] text-pretty sm:text-base">
            {project.summary[locale]}
          </p>

          {visibleChips.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {visibleChips.map((chip) => (
                <li
                  key={chip.name}
                  className="inline-flex items-center gap-2 rounded-[4px] border border-[#1E2530] bg-[#08090B] px-2.5 py-1 font-mono text-xs text-[#CBD5E1]"
                >
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: chip.brandColor }}
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  <span>{chip.name}</span>
                </li>
              ))}
              {hiddenChipCount > 0 && (
                <li className="inline-flex items-center rounded-[4px] border border-[#1E2530] bg-[#08090B] px-2.5 py-1 font-mono text-xs text-[#94A3B8]">
                  +{hiddenChipCount}
                </li>
              )}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.links.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 text-xs font-bold tracking-wide text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.98]"
              >
                <Globe size={15} weight="bold" aria-hidden="true" />
                <span>{copy.liveDemo}</span>
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
            )}

            {project.links.repoUrl && (
              <a
                href={project.links.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#334155] bg-[#08090B] px-5 text-xs font-medium text-[#F8FAFC] transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-[#11151B] active:scale-[0.98]"
              >
                <GithubLogo size={15} weight="bold" aria-hidden="true" />
                <span>{copy.sourceCode}</span>
              </a>
            )}

            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-accent transition-colors duration-150 hover:text-[#22D3EE]"
            >
              <span>{copy.viewCaseStudy}</span>
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
