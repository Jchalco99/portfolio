import type { ProjectEntry } from "@/content/projects/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectsShowcaseProps {
  locale: Locale;
  projects: ProjectEntry[];
  copy: Dictionary["projects"];
}

/**
 * Vertical stack of full-width alternating horizontal project rows.
 */
export function ProjectsShowcase({
  locale,
  projects,
  copy,
}: ProjectsShowcaseProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          locale={locale}
          copy={copy}
          index={index}
        />
      ))}
    </div>
  );
}
