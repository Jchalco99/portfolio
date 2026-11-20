import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { getPublishedProjects } from "@/lib/projects";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const projects = getPublishedProjects();

  const homeEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    alternates: {
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
      },
    },
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    LOCALES.map((locale) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      alternates: {
        languages: {
          es: `${siteUrl}/es/projects/${project.slug}`,
          en: `${siteUrl}/en/projects/${project.slug}`,
        },
      },
    }))
  );

  return [...homeEntries, ...projectEntries];
}
