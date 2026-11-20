import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Oswald, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PROFILE } from "@/content/profile";
import { isLocale, LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={cn(
        "dark",
        oswald.variable,
        plusJakartaSans.variable,
        ibmPlexMono.variable
      )}
    >
      <body className="min-h-screen bg-canvas text-text-primary antialiased selection:bg-accent selection:text-accent-fg">
        <MotionProvider>
          <IntroLoader />
          <div id="top" className="flex min-h-screen flex-col">
            <SiteHeader
              locale={locale}
              nav={dict.nav}
              cv={dict.cv}
              profile={{
                name: PROFILE.name,
                monogram: PROFILE.monogram,
                role: PROFILE.role[locale],
              }}
            />
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
