"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DiDotnet, DiMsqlServer } from "react-icons/di";
import { RiOpenaiFill, RiRobot2Line, RiSparkling2Line } from "react-icons/ri";
import {
  SiClaude,
  SiCss,
  SiDotnet,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostman,
  SiReact,
  SiScrumalliance,
  SiSharp,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbApi, TbDatabaseCog, TbSql } from "react-icons/tb";
import {
  STACK_CATEGORIES,
  type StackCategory,
  type StackCategoryId,
  type StackTechId,
  type StackTechItem,
} from "@/content/stack";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { EASE_PRECISE } from "@/lib/motion";

interface StackSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const SECONDARY_ITEMS_GRID: Partial<Record<StackCategoryId, string>> = {
  databases: "grid-cols-1 sm:grid-cols-3",
  apisTooling: "grid-cols-2 sm:grid-cols-3",
  ai: "grid-cols-2 sm:grid-cols-3",
};

function TechIcon({
  id,
  className = "h-5 w-5",
}: {
  id: StackTechId;
  className?: string;
}) {
  switch (id) {
    case "react":
      return <SiReact className={className} aria-hidden="true" />;
    case "typescript":
      return (
        <span
          className={cn(
            "relative inline-flex items-center justify-center",
            className
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-[14%] rounded-[2px] bg-white"
          />
          <SiTypescript className="relative h-full w-full" aria-hidden="true" />
        </span>
      );
    case "javascript":
      return (
        <span
          className={cn(
            "relative inline-flex items-center justify-center",
            className
          )}
        >
          <span
            aria-hidden="true"
            className="absolute inset-[14%] rounded-[2px] bg-[#08090B]"
          />
          <SiJavascript className="relative h-full w-full" aria-hidden="true" />
        </span>
      );
    case "html5":
      return <SiHtml5 className={className} aria-hidden="true" />;
    case "css3":
      return <SiCss className={className} aria-hidden="true" />;
    case "tailwind":
      return <SiTailwindcss className={className} aria-hidden="true" />;
    case "csharp":
      return <SiSharp className={className} aria-hidden="true" />;
    case "dotnet":
      return <SiDotnet className={className} aria-hidden="true" />;
    case "aspnet":
      return <DiDotnet className={className} aria-hidden="true" />;
    case "ef":
      return <TbDatabaseCog className={className} aria-hidden="true" />;
    case "sqlserver":
      return <DiMsqlServer className={className} aria-hidden="true" />;
    case "sql":
      return <TbSql className={className} aria-hidden="true" />;
    case "mysql":
      return <SiMysql className={className} aria-hidden="true" />;
    case "rest":
      return <TbApi className={className} aria-hidden="true" />;
    case "postman":
      return <SiPostman className={className} aria-hidden="true" />;
    case "swagger":
      return <SiSwagger className={className} aria-hidden="true" />;
    case "git":
      return <SiGit className={className} aria-hidden="true" />;
    case "github":
      return <SiGithub className={className} aria-hidden="true" />;
    case "scrum":
      return <SiScrumalliance className={className} aria-hidden="true" />;
    case "chatbots":
      return <RiRobot2Line className={className} aria-hidden="true" />;
    case "genai":
      return <RiSparkling2Line className={className} aria-hidden="true" />;
    case "claude":
      return <SiClaude className={className} aria-hidden="true" />;
    case "gemini":
      return <SiGooglegemini className={className} aria-hidden="true" />;
    case "codex":
      return <RiOpenaiFill className={className} aria-hidden="true" />;
  }
}

function CardPerimeterGeometry({
  variant,
  featured,
}: {
  variant: number;
  featured: boolean;
}) {
  const mirrorDiagonal = variant % 2 === 1;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className={cn(
          "absolute inset-0",
          featured ? "opacity-25" : "opacity-15"
        )}
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
          mirrorDiagonal ? "left-0 -scale-x-100" : "right-0"
        )}
      >
        <polyline
          points="24,0 88,64 88,88"
          stroke="#2A3441"
          strokeOpacity={featured ? "0.85" : "0.5"}
          strokeWidth="1"
        />
        <line
          x1="48"
          y1="0"
          x2="88"
          y2="40"
          stroke="#06B6D4"
          strokeOpacity={featured ? "0.4" : "0.2"}
          strokeWidth="1"
        />
      </svg>

      <svg
        viewBox="0 0 88 88"
        fill="none"
        className={cn(
          "absolute bottom-0 h-14 w-14 sm:h-16 sm:w-16",
          mirrorDiagonal ? "right-0 -scale-x-100" : "left-0"
        )}
      >
        <polyline
          points="0,24 64,88 0,88"
          stroke="#2A3441"
          strokeOpacity={featured ? "0.7" : "0.4"}
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="48"
          x2="40"
          y2="88"
          stroke="#06B6D4"
          strokeOpacity={featured ? "0.35" : "0.18"}
          strokeWidth="1"
        />
      </svg>

      <span
        className={cn(
          "absolute left-2 top-2 border-l-2 border-t-2 transition-colors duration-200 group-hover/card:border-[#22D3EE]",
          featured ? "h-3.5 w-3.5 border-[#22D3EE]" : "h-2.5 w-2.5 border-[#2A3441]"
        )}
      />
      <span
        className={cn(
          "absolute right-2 top-2 border-r-2 border-t-2 transition-colors duration-200 group-hover/card:border-[#22D3EE]",
          featured
            ? "h-3.5 w-3.5 border-accent/70"
            : "h-2.5 w-2.5 border-accent-border/70"
        )}
      />
      <span
        className={cn(
          "absolute bottom-2 left-2 border-b-2 border-l-2 transition-colors duration-200 group-hover/card:border-[#22D3EE]",
          featured
            ? "h-3.5 w-3.5 border-accent/70"
            : "h-2.5 w-2.5 border-accent-border/70"
        )}
      />
      <span
        className={cn(
          "absolute bottom-2 right-2 border-b-2 border-r-2 transition-colors duration-200 group-hover/card:border-[#22D3EE]",
          featured ? "h-3.5 w-3.5 border-[#22D3EE]" : "h-2.5 w-2.5 border-[#2A3441]"
        )}
      />
    </div>
  );
}

function CoreTechTile({
  item,
  delay,
  shouldReduceMotion,
}: {
  item: StackTechItem;
  delay: number;
  shouldReduceMotion: boolean;
}) {
  const brandVars = {
    "--brand": item.brandColor,
    "--brand-border": `${item.brandColor}59`,
    "--brand-glow": `${item.brandColor}4D`,
    background: `radial-gradient(circle at top left, ${item.brandColor}24 0%, #0D1219 62%, #08090B 100%)`,
  } as CSSProperties;

  return (
    <motion.li
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.25, delay, ease: EASE_PRECISE }
      }
      style={brandVars}
      className="group/item relative flex flex-col justify-between gap-3.5 overflow-hidden rounded-[4px] border [border-color:var(--brand-border)] px-4 py-4 pl-5 transition-[border-color,box-shadow] duration-150 hover:[border-color:var(--brand)] hover:[box-shadow:0_12px_28px_-12px_var(--brand-glow)]"
    >
      <span
        aria-hidden="true"
        style={{ backgroundColor: item.brandColor }}
        className="absolute inset-y-0 left-0 w-[3px] transition-opacity duration-150"
      />

      <div className="flex items-start justify-between gap-2">
        <span
          style={{ color: item.brandColor }}
          className="shrink-0 transition-transform duration-150 group-hover/item:scale-105"
        >
          <TechIcon id={item.id} className="h-7 w-7" />
        </span>

        <span
          aria-hidden="true"
          style={{
            backgroundColor: item.brandColor,
            boxShadow: `0 0 10px ${item.brandColor}80`,
          }}
          className="mt-1 h-2 w-2 shrink-0 rounded-full opacity-80 transition-opacity duration-150 group-hover/item:opacity-100"
        />
      </div>

      <span className="font-display text-lg font-bold uppercase tracking-wide text-[#F8FAFC] sm:text-xl">
        {item.name}
      </span>
    </motion.li>
  );
}

function StandardTechTile({
  item,
  delay,
  shouldReduceMotion,
  className,
}: {
  item: StackTechItem;
  delay: number;
  shouldReduceMotion: boolean;
  className?: string;
}) {
  const isPrimary = item.tier === "primary";
  const brandVars = {
    "--brand": item.brandColor,
    "--brand-glow": `${item.brandColor}33`,
  } as CSSProperties;

  return (
    <motion.li
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      whileHover={shouldReduceMotion ? undefined : { y: -1.5, scale: 1.01 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.22, delay, ease: EASE_PRECISE }
      }
      style={brandVars}
      className={cn(
        "group/item relative flex items-center gap-2.5 rounded-[4px] border transition-[border-color,background-color,box-shadow] duration-150 hover:[border-color:color-mix(in_srgb,var(--brand)_55%,transparent)]",
        isPrimary
          ? "border-[#1E2530] bg-[#0D1117] px-3 py-2.5 hover:bg-[#111720] hover:[box-shadow:0_6px_18px_-10px_var(--brand-glow)]"
          : "border-[#181F29] bg-[#08090B]/70 px-2.5 py-2 hover:bg-[#0D1218]",
        className
      )}
    >
      <span
        style={{ color: item.brandColor }}
        className={cn(
          "shrink-0 transition-opacity duration-150 group-hover/item:opacity-100",
          isPrimary ? "opacity-95" : "opacity-80"
        )}
      >
        <TechIcon
          id={item.id}
          className={isPrimary ? "h-[18px] w-[18px]" : "h-4 w-4"}
        />
      </span>

      <span
        className={cn(
          "min-w-0 leading-tight transition-colors duration-150 group-hover/item:text-[#F8FAFC]",
          isPrimary
            ? "text-[13px] font-semibold text-[#CBD5E1] sm:text-sm"
            : "text-xs font-medium text-[#94A3B8] sm:text-[13px]"
        )}
      >
        {item.name}
      </span>
    </motion.li>
  );
}

function StackCategoryCard({
  category,
  index,
  locale,
  shouldReduceMotion,
}: {
  category: StackCategory;
  index: number;
  locale: Locale;
  shouldReduceMotion: boolean;
}) {
  const coreItems = category.items.filter((item) => item.tier === "core");
  const supportingItems = category.items.filter(
    (item) => item.tier === "supporting"
  );

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.35,
              delay: index * 0.06,
              ease: EASE_PRECISE,
            }
      }
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-[4px] border transition-[border-color,box-shadow] duration-200",
        category.featured
          ? "flex-1 border-accent-border/55 bg-[#0E1116] p-5 shadow-[0_14px_40px_-20px_rgba(6,182,212,0.28)] hover:border-accent hover:shadow-[0_16px_42px_-18px_rgba(6,182,212,0.34)] sm:p-6"
          : "border-[#1E2530] bg-[#0B0D12]/90 p-4 hover:border-accent-border/70 sm:p-5"
      )}
    >
      <CardPerimeterGeometry variant={index} featured={category.featured} />

      <div className="relative z-10 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0",
            category.featured
              ? "h-5 w-1 bg-[#22D3EE]"
              : "h-3.5 w-0.5 bg-accent-border"
          )}
        />
        <h3
          className={cn(
            "font-display font-bold uppercase tracking-wider",
            category.featured
              ? "text-xl text-[#F8FAFC] sm:text-2xl"
              : "text-base text-[#94A3B8] sm:text-lg"
          )}
        >
          {category.title[locale]}
        </h3>
        <span
          aria-hidden="true"
          className={cn(
            "h-px flex-1",
            category.featured ? "bg-[#1E2530]" : "bg-[#1A212B]"
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0 rotate-45",
            category.featured ? "bg-[#22D3EE]/80" : "bg-[#2A3441]"
          )}
        />
      </div>

      {coreItems.length > 0 ? (
        <div className="relative z-10 mt-5 flex flex-1 flex-col justify-between gap-4">
          <ul
            className={cn(
              "grid gap-3",
              coreItems.length === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-2"
            )}
          >
            {coreItems.map((item, itemIndex) => (
              <CoreTechTile
                key={item.id}
                item={item}
                delay={index * 0.04 + itemIndex * 0.04}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </ul>

          {supportingItems.length > 0 && (
            <ul
              className={cn(
                "grid gap-2.5 border-t border-[#1E2530] pt-3.5",
                supportingItems.length === 3
                  ? "grid-cols-2 sm:grid-cols-3"
                  : "grid-cols-2"
              )}
            >
              {supportingItems.map((item, itemIndex) => (
                <StandardTechTile
                  key={item.id}
                  item={item}
                  delay={index * 0.04 + (coreItems.length + itemIndex) * 0.03}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul
          className={cn(
            "relative z-10 mt-3.5 grid gap-2",
            SECONDARY_ITEMS_GRID[category.id] ?? "grid-cols-2 sm:grid-cols-3"
          )}
        >
          {category.items.map((item, itemIndex) => (
            <StandardTechTile
              key={item.id}
              item={item}
              delay={index * 0.04 + itemIndex * 0.025}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ul>
      )}
    </motion.article>
  );
}

/**
 * Technical stack section organized in a 2-column asymmetric layout:
 * left column (7 cols) spotlights Frontend & Backend Core technologies,
 * right column (5 cols) compacts Databases, APIs/Tooling & AI cleanly.
 */
export function StackSection({ locale, dict }: StackSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const featuredCategories = STACK_CATEGORIES.filter(
    (category) => category.featured
  );
  const secondaryCategories = STACK_CATEGORIES.filter(
    (category) => !category.featured
  );

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="scroll-mt-24 border-t border-border-subtle bg-canvas"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span aria-hidden="true" className="h-5 w-1 shrink-0 bg-[#22D3EE]" />
          <h2
            id="stack-heading"
            className="font-display text-2xl font-bold uppercase tracking-wider text-text-primary sm:text-3xl"
          >
            {dict.stack.title}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-[#1E2530]" />
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#22D3EE]/80"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col gap-5 lg:col-span-7 lg:gap-6">
            {featuredCategories.map((category, index) => (
              <StackCategoryCard
                key={category.id}
                category={category}
                index={index}
                locale={locale}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          <div className="flex flex-col justify-between gap-4 lg:col-span-5 lg:gap-5">
            {secondaryCategories.map((category, index) => (
              <StackCategoryCard
                key={category.id}
                category={category}
                index={featuredCategories.length + index}
                locale={locale}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
