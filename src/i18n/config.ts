export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_COOKIE_NAME = "portfolio_locale";

/** Type guard verifying that an arbitrary route segment is a supported locale. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Returns the complementary locale for switching between ES and EN. */
export function getOtherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

interface LanguagePreference {
  tag: string;
  quality: number;
}

/**
 * Parses an HTTP Accept-Language header by q-weight and selects the first
 * matching supported locale, falling back to DEFAULT_LOCALE.
 */
export function resolvePreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const preferences: LanguagePreference[] = acceptLanguage
    .split(",")
    .map((entry) => {
      const [rawTag, ...params] = entry.trim().split(";");
      const tag = rawTag.toLowerCase();
      let quality = 1;

      for (const param of params) {
        const [key, val] = param.trim().split("=");
        if (key === "q" && val) {
          const parsed = Number.parseFloat(val);
          if (!Number.isNaN(parsed)) {
            quality = Math.max(0, Math.min(1, parsed));
          }
        }
      }

      return { tag, quality };
    })
    .filter((item) => item.tag.length > 0 && item.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const pref of preferences) {
    const baseTag = pref.tag.split("-")[0];
    if (isLocale(baseTag)) {
      return baseTag;
    }
  }

  return DEFAULT_LOCALE;
}
