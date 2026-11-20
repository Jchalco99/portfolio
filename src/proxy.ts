import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  LOCALES,
  LOCALE_COOKIE_NAME,
  resolvePreferredLocale,
  type Locale,
} from "./i18n/config";

const PUBLIC_FILE_PATTERN = /\.[^/]+$/;

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return resolvePreferredLocale(request.headers.get("accept-language"));
}

/**
 * Redirects unlocalized paths to /es or /en while preserving static assets,
 * API routes, and direct /cv/*.pdf downloads.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/cv") ||
    PUBLIC_FILE_PATTERN.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const targetPath = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  const redirectUrl = new URL(`${targetPath}${search}`, request.url);

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|cv|.*\\..*).*)"],
};
