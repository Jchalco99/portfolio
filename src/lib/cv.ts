import type { Locale } from "@/i18n/config";

export const CV_PATHS: Record<Locale, string> = {
  es: "/cv/cv-es.pdf",
  en: "/cv/cv-en.pdf",
};

export interface CvAsset {
  locale: Locale;
  href: string;
  downloadName: string;
}

/** Returns static PDF path and suggested download filename for a locale. */
export function getCvAsset(locale: Locale): CvAsset {
  return {
    locale,
    href: CV_PATHS[locale],
    downloadName: locale === "es" ? "cv-es.pdf" : "cv-en.pdf",
  };
}
