import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Browsers,
  GithubLogo,
  Globe,
  HardDrives,
} from "@phosphor-icons/react/ssr";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectArchitectureViewer } from "@/components/projects/ProjectArchitectureViewer";
import {
  FOCUS_BADGE_CLASSES,
  TECH_CHIP_CLASSES,
} from "@/components/projects/project-meta";
import type {
  ProjectStack,
  TechnicalDecision,
} from "@/content/projects/schema";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { getProjectBySlug, getPublishedProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = getPublishedProjects();
  if (projects.length === 0) {
    return [{ slug: "__placeholder__" }];
  }
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: dict.meta.projectNotFoundTitle,
    };
  }

  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: {
        es: `/es/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
      },
    },
  };
}

function DecisionLayerColumn({
  layer,
  heading,
  decisions,
  locale,
  labels,
}: {
  layer: "backend" | "frontend";
  heading: string;
  decisions: TechnicalDecision[];
  locale: Locale;
  labels: Pick<
    Dictionary["projects"],
    "decisionContextLabel" | "decisionChoiceLabel" | "decisionTradeoffLabel"
  >;
}) {
  const isBackend = layer === "backend";
  const Icon = isBackend ? HardDrives : Browsers;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-[6px] px-2.5 py-1 font-mono text-xs font-medium",
            isBackend
              ? "bg-accent-soft text-accent"
              : "bg-frontend-soft text-frontend"
          )}
        >
          <Icon size={15} weight="bold" aria-hidden="true" />
          <h3 className="font-mono text-xs font-medium">{heading}</h3>
        </span>
      </div>

      <div className="space-y-4">
        {decisions.map((item, index) => (
          <article
            key={`${layer}-${index}-${item.title.en}`}
            className="surface-card space-y-4 p-5"
          >
            <h4 className="font-display text-base font-semibold text-text-primary">
              {item.title[locale]}
            </h4>

            <dl className="space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="font-mono text-[11px] text-text-muted">
                  {labels.decisionContextLabel}
                </dt>
                <dd className="mt-0.5 text-text-secondary text-pretty">
                  {item.context[locale]}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[11px] text-text-muted">
                  {labels.decisionChoiceLabel}
                </dt>
                <dd className="mt-0.5 text-text-primary text-pretty">
                  {item.decision[locale]}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[11px] text-text-muted">
                  {labels.decisionTradeoffLabel}
                </dt>
                <dd className="mt-0.5 text-text-secondary text-pretty">
                  {item.tradeoff[locale]}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const dict = getDictionary(locale);
  const stackGroupOrder: readonly (keyof ProjectStack)[] = [
    "backend",
    "frontend",
    "database",
    "infrastructure",
  ];
  const populatedStackGroups = stackGroupOrder.filter(
    (group) => project.stack[group].length > 0
  );

  const hasBackendDecisions = project.decisions.backend.length > 0;
  const hasFrontendDecisions = project.decisions.frontend.length > 0;
  const hasAnyDecisions = hasBackendDecisions || hasFrontendDecisions;

  return (
    <>
      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Link
            href={`/${locale}#projects`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] px-1 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            <ArrowLeft size={14} weight="bold" aria-hidden="true" />
            <span>{dict.projects.backToProjects}</span>
          </Link>

          <header className="space-y-5 border-b border-border-subtle pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-[6px] px-2.5 py-0.5 font-mono text-xs font-medium",
                  FOCUS_BADGE_CLASSES[project.focus]
                )}
              >
                {dict.projects.filters[project.focus]}
              </span>

              {project.featured && (
                <span className="rounded-[6px] border border-border-subtle bg-surface px-2.5 py-0.5 font-mono text-[11px] text-text-secondary">
                  {dict.projects.featuredLabel}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary text-balance sm:text-4xl">
                {project.title[locale]}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-text-secondary text-pretty sm:text-lg">
                {project.summary[locale]}
              </p>
            </div>

            {(project.links.liveUrl || project.links.repoUrl) && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {project.links.liveUrl && (
                  <a
                    href={project.links.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-accent px-5 text-sm font-semibold text-accent-fg transition-[background-color,transform] duration-150 hover:bg-accent-hover active:scale-[0.98]"
                  >
                    <Globe size={16} weight="bold" aria-hidden="true" />
                    <span>{dict.projects.liveDemo}</span>
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </a>
                )}

                {project.links.repoUrl && (
                  <a
                    href={project.links.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] border border-border-strong bg-surface px-5 text-sm font-medium text-text-primary transition-[background-color,border-color,transform] duration-150 hover:border-text-muted hover:bg-elevated active:scale-[0.98]"
                  >
                    <GithubLogo size={16} weight="bold" aria-hidden="true" />
                    <span>{dict.projects.sourceCode}</span>
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </header>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <section
              aria-labelledby="case-problem-heading"
              className="surface-card space-y-3 p-5 sm:p-6 lg:col-span-7"
            >
              <h2
                id="case-problem-heading"
                className="font-display text-lg font-semibold text-text-primary"
              >
                {dict.projects.problemTitle}
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary text-pretty sm:text-base">
                {project.problem[locale]}
              </p>
            </section>

            <section
              aria-labelledby="case-stack-heading"
              className="surface-card space-y-4 p-5 sm:p-6 lg:col-span-5"
            >
              <h2
                id="case-stack-heading"
                className="font-display text-lg font-semibold text-text-primary"
              >
                {dict.projects.stackTitle}
              </h2>

              <div className="space-y-4">
                {populatedStackGroups.map((group) => (
                  <div key={group} className="space-y-2">
                    <p className="font-mono text-[11px] text-text-muted">
                      {dict.projects.stackGroups[group]}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.stack[group].map((item) => (
                        <li
                          key={item}
                          className={cn(
                            "rounded-[6px] border px-2.5 py-1 font-mono text-xs",
                            TECH_CHIP_CLASSES[group]
                          )}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section
            aria-labelledby="case-architecture-heading"
            className="surface-card space-y-4 p-5 sm:p-6"
          >
            <h2
              id="case-architecture-heading"
              className="font-display text-lg font-semibold text-text-primary"
            >
              {dict.projects.architectureTitle}
            </h2>

            <ProjectArchitectureViewer
              locale={locale}
              architecture={project.architecture}
              labels={{
                title: dict.projects.architectureTitle,
                hint: dict.projects.architectureNodesHint,
                layers: dict.projects.architectureLayers,
              }}
            />
          </section>

          {hasAnyDecisions && (
            <section
              aria-labelledby="case-decisions-heading"
              className="space-y-6"
            >
              <h2
                id="case-decisions-heading"
                className="font-display text-2xl font-bold tracking-tight text-text-primary"
              >
                {dict.projects.decisionsTitle}
              </h2>

              <div
                className={cn(
                  "grid gap-6",
                  hasBackendDecisions &&
                    hasFrontendDecisions &&
                    "lg:grid-cols-2"
                )}
              >
                {hasBackendDecisions && (
                  <DecisionLayerColumn
                    layer="backend"
                    heading={dict.projects.backendTab}
                    decisions={project.decisions.backend}
                    locale={locale}
                    labels={dict.projects}
                  />
                )}

                {hasFrontendDecisions && (
                  <DecisionLayerColumn
                    layer="frontend"
                    heading={dict.projects.frontendTab}
                    decisions={project.decisions.frontend}
                    locale={locale}
                    labels={dict.projects}
                  />
                )}
              </div>
            </section>
          )}

          <div className="border-t border-border-subtle pt-6">
            <Link
              href={`/${locale}#projects`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] px-1 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              <ArrowLeft size={14} weight="bold" aria-hidden="true" />
              <span>{dict.projects.backToProjects}</span>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
