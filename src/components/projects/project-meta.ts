import type { ProjectFocus, ProjectStack } from "@/content/projects/schema";

export const FOCUS_BADGE_CLASSES: Record<ProjectFocus, string> = {
  fullstack: "border border-border-strong bg-elevated text-text-primary",
  backend: "bg-accent-soft text-accent",
  frontend: "bg-frontend-soft text-frontend",
};

export interface CategorizedTechChip {
  name: string;
  group: keyof ProjectStack;
  brandColor: string;
}

export const TECH_CHIP_CLASSES: Record<keyof ProjectStack, string> = {
  backend: "border-accent/35 bg-accent-soft text-accent",
  frontend: "border-frontend/35 bg-frontend-soft text-frontend",
  database: "border-border-subtle bg-inset text-text-secondary",
  infrastructure: "border-border-subtle bg-inset text-text-secondary",
};

const BRAND_COLOR_RULES: readonly [RegExp, string, number][] = [
  [/^c#$/i, "#A855F7", 1],
  [/^\.?net/i, "#8B5CF6", 2],
  [/^asp\.?net/i, "#60A5FA", 3],
  [/^entity\s*framework|^ef\s*core/i, "#A78BFA", 4],
  [/^react/i, "#61DAFB", 5],
  [/^typescript|^ts$/i, "#3178C6", 6],
  [/^javascript|^js$/i, "#F7DF1E", 7],
  [/^sql\s*server/i, "#F87171", 8],
  [/^mysql/i, "#F59E0B", 9],
  [/^sql$/i, "#38BDF8", 10],
  [/^postgres/i, "#38BDF8", 11],
  [/^next\.?js/i, "#E2E8F0", 12],
  [/^tailwind/i, "#38BDF8", 13],
  [/^html/i, "#E34F26", 14],
  [/^css/i, "#38BDF8", 15],
  [/^docker/i, "#38BDF8", 16],
  [/^git$/i, "#F05032", 17],
  [/^postman/i, "#FF6C37", 18],
  [/^swagger|openapi/i, "#85EA2D", 19],
];

function resolveTechMetadata(name: string): {
  brandColor: string;
  priority: number;
} {
  for (const [pattern, brandColor, priority] of BRAND_COLOR_RULES) {
    if (pattern.test(name)) {
      return { brandColor, priority };
    }
  }
  return { brandColor: "#06B6D4", priority: 100 };
}

/**
 * Flattens categorized stack arrays into deduplicated chips prioritized around
 * core C#/.NET, React/TS/JS, and SQL technologies with brand colors.
 */
export function collectProjectTechChips(
  stack: ProjectStack
): CategorizedTechChip[] {
  const seen = new Set<string>();
  const orderedGroups: readonly (keyof ProjectStack)[] = [
    "backend",
    "frontend",
    "database",
    "infrastructure",
  ];
  const collected: { chip: CategorizedTechChip; priority: number; seq: number }[] =
    [];
  let seq = 0;

  for (const group of orderedGroups) {
    for (const item of stack[group]) {
      const normalized = item.trim();
      if (!normalized || seen.has(normalized.toLowerCase())) {
        continue;
      }
      seen.add(normalized.toLowerCase());
      const meta = resolveTechMetadata(normalized);
      collected.push({
        chip: {
          name: normalized,
          group,
          brandColor: meta.brandColor,
        },
        priority: meta.priority,
        seq,
      });
      seq += 1;
    }
  }

  collected.sort((a, b) => a.priority - b.priority || a.seq - b.seq);
  return collected.map((entry) => entry.chip);
}
