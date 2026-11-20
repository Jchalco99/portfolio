import { ProjectEmptyState } from "@/components/projects/ProjectEmptyState";
import { ProjectsShowcase } from "@/components/projects/ProjectsShowcase";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getPublishedProjects } from "@/lib/projects";

interface ProjectsSectionProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * Scalable project showcase section reading from the typed registry.
 * Renders alternating horizontal project rows or a structured empty state.
 */
export function ProjectsSection({ locale, dict }: ProjectsSectionProps) {
  const projects = getPublishedProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-border-subtle bg-canvas"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span aria-hidden="true" className="h-5 w-1 shrink-0 bg-[#22D3EE]" />
          <h2
            id="projects-heading"
            className="font-display text-2xl font-bold uppercase tracking-wider text-text-primary sm:text-3xl"
          >
            {dict.projects.title}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-[#1E2530]" />
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#22D3EE]/80"
          />
        </div>

        {projects.length === 0 ? (
          <ProjectEmptyState locale={locale} copy={dict.projects} />
        ) : (
          <ProjectsShowcase
            locale={locale}
            projects={projects}
            copy={dict.projects}
          />
        )}
      </div>
    </section>
  );
}
