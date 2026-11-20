import type { LocalizedText } from "@/i18n/types";

export interface ProfileLinks {
  github: string | null;
  linkedin: string | null;
}

export interface ProfileConfig {
  name: string;
  monogram: string;
  role: LocalizedText;
  location: LocalizedText | null;
  email: string | null;
  /**
   * Optional portrait path served from /public (e.g. "/images/hero-portrait.jpg").
   * Place the file under public/images/ and set the path here when ready.
   */
  heroImage: string | null;
  links: ProfileLinks;
}

/**
 * Replace these explicit placeholders with your real details when ready.
 * Optional fields set to null stay hidden in the UI instead of rendering broken links.
 */
export const PROFILE: ProfileConfig = {
  name: "Jose Chalco",
  monogram: "JC",
  role: {
    es: "Desarrollador Fullstack",
    en: "Fullstack Developer",
  },
  location: null,
  email: "josejavierchalco2006@gmail.com",
  heroImage: "/images/hero-portrait.jpg",
  links: {
    github: "https://github.com/Jchalco99",
    linkedin: "https://www.linkedin.com/in/jose-chalco-rosales/",
  },
};
