import { PROJECTS } from "@/content/projects";
import type { ProjectEntry, ProjectFocus } from "@/content/projects/schema";

/** Returns all published projects ordered by priority (`order` ascending). */
export function getPublishedProjects(): ProjectEntry[] {
  return PROJECTS.filter((project) => project.status === "published").sort(
    (a, b) => a.order - b.order
  );
}

/** Finds a single published project by slug. */
export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return getPublishedProjects().find((project) => project.slug === slug);
}

/** Returns focus filter options only for categories represented by published projects. */
export function getAvailableFocusFilters(): ProjectFocus[] {
  const present = new Set<ProjectFocus>();
  for (const project of getPublishedProjects()) {
    present.add(project.focus);
  }
  return (["fullstack", "backend", "frontend"] as const).filter((focus) =>
    present.has(focus)
  );
}
