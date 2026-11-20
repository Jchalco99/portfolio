import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <>
      <main id="main-content" className="flex-1">
        <HeroSection locale={locale} dict={dict} />
        <StackSection locale={locale} dict={dict} />
        <ProjectsSection locale={locale} dict={dict} />
        <ContactSection locale={locale} dict={dict} />
      </main>

      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
