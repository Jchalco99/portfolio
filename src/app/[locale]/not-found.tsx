"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

function resolveClientLocale(
  paramLocale: string | string[] | undefined,
  pathname: string | null
): Locale {
  if (typeof paramLocale === "string" && isLocale(paramLocale)) {
    return paramLocale;
  }

  const firstSegment = pathname?.split("/")[1];
  if (firstSegment && isLocale(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

export default function LocaleNotFoundPage() {
  const params = useParams();
  const pathname = usePathname();
  const locale = resolveClientLocale(params?.locale, pathname);
  const dict = getDictionary(locale);

  return (
    <main
      id="main-content"
      className="flex flex-1 items-center justify-center px-6 py-16"
    >
      <div className="surface-card w-full max-w-md space-y-4 p-8">
        <p className="font-mono text-sm font-medium text-accent">
          {dict.notFound.code}
        </p>
        <h1 className="font-display text-2xl font-bold text-text-primary">
          {dict.notFound.title}
        </h1>
        <p className="text-sm leading-relaxed text-text-secondary">
          {dict.notFound.description}
        </p>
        <div className="pt-2">
          <Link
            href={`/${locale}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {dict.notFound.backHome}
          </Link>
        </div>
      </div>
    </main>
  );
}
