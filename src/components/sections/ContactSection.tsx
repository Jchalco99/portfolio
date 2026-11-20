"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { PROFILE } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { cn } from "@/lib/cn";
import {
  contactPayloadSchema,
  mapFieldErrors,
  type ContactApiResponse,
  type ContactFieldErrors,
  type ContactFieldName,
} from "@/lib/contact-schema";
import { getCvAsset } from "@/lib/cv";
import { EASE_PRECISE } from "@/lib/motion";

interface ContactSectionProps {
  locale: Locale;
  dict: Dictionary;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

const INITIAL_FORM_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

function formatDraftBody(
  payload: Pick<FormValues, "name" | "email" | "message">,
  locale: Locale
): string {
  const nameLabel = locale === "es" ? "Nombre" : "Name";
  const emailLabel = locale === "es" ? "Correo" : "Email";
  return `${nameLabel}: ${payload.name}\n${emailLabel}: ${payload.email}\n\n${payload.message}`;
}

function buildGmailComposeUrl(
  recipient: string,
  payload: Pick<FormValues, "name" | "email" | "subject" | "message">,
  locale: Locale
): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: recipient,
    su: payload.subject,
    body: formatDraftBody(payload, locale),
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function buildMailtoUrl(
  recipient: string,
  payload: Pick<FormValues, "name" | "email" | "subject" | "message">,
  locale: Locale
): string {
  const params = new URLSearchParams({
    subject: payload.subject,
    body: formatDraftBody(payload, locale),
  });
  return `mailto:${recipient}?${params.toString().replace(/\+/g, "%20")}`;
}

function CardCornerDecor({ mirror = false }: { mirror?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1E2530 1px, transparent 1px), linear-gradient(to bottom, #1E2530 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <svg
        viewBox="0 0 88 88"
        fill="none"
        className={cn(
          "absolute top-0 h-14 w-14 sm:h-16 sm:w-16",
          mirror ? "left-0 -scale-x-100" : "right-0"
        )}
      >
        <polyline
          points="24,0 88,64 88,88"
          stroke="#2A3441"
          strokeOpacity="0.8"
          strokeWidth="1"
        />
        <line
          x1="48"
          y1="0"
          x2="88"
          y2="40"
          stroke="#06B6D4"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </svg>

      <svg
        viewBox="0 0 88 88"
        fill="none"
        className={cn(
          "absolute bottom-0 h-14 w-14 sm:h-16 sm:w-16",
          mirror ? "right-0 -scale-x-100" : "left-0"
        )}
      >
        <polyline
          points="0,24 64,88 0,88"
          stroke="#2A3441"
          strokeOpacity="0.65"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="48"
          x2="40"
          y2="88"
          stroke="#06B6D4"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </svg>

      <span className="absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-[#22D3EE]" />
      <span className="absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-accent-border" />
      <span className="absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-accent-border" />
      <span className="absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-[#22D3EE]" />
    </div>
  );
}

/**
 * Interactive two-column Contact & CV section connected to POST /api/contact
 * with client-side Zod validation, honeypot protection, direct channels,
 * clipboard copy feedback, and bilingual CV PDF downloads.
 */
export function ContactSection({ locale, dict }: ContactSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const copyTimerRef = useRef<number | null>(null);

  const [values, setValues] = useState<FormValues>(INITIAL_FORM_VALUES);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const [draftLinks, setDraftLinks] = useState<{
    gmailUrl: string;
    mailtoUrl: string;
  } | null>(null);

  const cvEs = getCvAsset("es");
  const cvEn = getCvAsset("en");
  const { github, linkedin } = PROFILE.links;

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleFieldChange = (field: keyof FormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));

    if (field !== "website" && fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (status === "error") {
      setStatus("idle");
      setServerMessage(null);
    }
  };

  const handleCopyEmail = async () => {
    if (!PROFILE.email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setHasCopiedEmail(true);

      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setHasCopiedEmail(false);
        copyTimerRef.current = null;
      }, 2200);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleReset = () => {
    setValues(INITIAL_FORM_VALUES);
    setFieldErrors({});
    setStatus("idle");
    setServerMessage(null);
    setDraftLinks(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    const parsed = contactPayloadSchema.safeParse({
      ...values,
      locale,
    });

    if (!parsed.success) {
      const mapped = mapFieldErrors(parsed.error, dict);
      setFieldErrors(mapped);
      setStatus("error");
      setServerMessage(dict.contact.api.validationFailed);

      const firstInvalidField = (
        ["name", "email", "subject", "message"] as const
      ).find((field) => Boolean(mapped[field]));
      if (firstInvalidField) {
        document.getElementById(`contact-${firstInvalidField}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    setFieldErrors({});
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.ok) {
        if (!data.ok && data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setStatus("error");
        setServerMessage(data.message || dict.contact.api.serverError);
        return;
      }

      setStatus("success");
      setServerMessage(data.message || dict.contact.api.simulatedSuccess);

      if (PROFILE.email) {
        const gmailUrl = buildGmailComposeUrl(PROFILE.email, parsed.data, locale);
        const mailtoUrl = buildMailtoUrl(PROFILE.email, parsed.data, locale);
        setDraftLinks({ gmailUrl, mailtoUrl });
        window.open(gmailUrl, "_blank", "noopener,noreferrer");
      }

      setValues(INITIAL_FORM_VALUES);
    } catch {
      setStatus("error");
      setServerMessage(dict.contact.api.serverError);
    }
  };

  const inputClassName = (field: ContactFieldName) =>
    cn(
      "w-full rounded-[4px] border bg-[#08090B] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#64748B] transition-[border-color,box-shadow] duration-150 focus:outline-none",
      fieldErrors[field]
        ? "border-danger/70 focus:border-danger focus:ring-1 focus:ring-danger/50"
        : "border-[#1E2530] focus:border-accent focus:ring-1 focus:ring-accent/50"
    );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-border-subtle bg-canvas"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span aria-hidden="true" className="h-5 w-1 shrink-0 bg-[#22D3EE]" />
          <h2
            id="contact-heading"
            className="font-display text-2xl font-bold uppercase tracking-wider text-text-primary sm:text-3xl"
          >
            {dict.contact.title}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-[#1E2530]" />
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#22D3EE]/80"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Contact Form connected to POST /api/contact */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.35, ease: EASE_PRECISE }
            }
            className="relative overflow-hidden rounded-[4px] border border-[#1E2530] bg-[#0E1116] p-5 sm:p-7 lg:col-span-7"
          >
            <CardCornerDecor />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2530] pb-4">
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#F8FAFC]">
                  {dict.contact.form.title}
                </h3>
                <p className="text-xs text-[#94A3B8]">{dict.contact.subtitle}</p>
              </div>

              {status === "success" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 space-y-5 rounded-[4px] border border-accent/40 bg-[#08090B] p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[#22D3EE]">
                      <Check size={18} weight="bold" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                      <p className="font-display text-lg font-bold uppercase tracking-wide text-[#F8FAFC]">
                        {dict.contact.form.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[#CBD5E1]">
                        {serverMessage}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {draftLinks && (
                      <>
                        <a
                          href={draftLinks.gmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-accent px-5 text-xs font-bold tracking-wide text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] transition-colors duration-150 hover:bg-accent-hover"
                        >
                          <EnvelopeSimple
                            size={15}
                            weight="bold"
                            aria-hidden="true"
                          />
                          <span>
                            {locale === "es"
                              ? "Abrir borrador en Gmail"
                              : "Open draft in Gmail"}
                          </span>
                          <ArrowUpRight
                            size={13}
                            weight="bold"
                            aria-hidden="true"
                          />
                        </a>

                        <a
                          href={draftLinks.mailtoUrl}
                          className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#334155] bg-[#0E1116] px-4 text-xs font-medium text-[#CBD5E1] transition-colors duration-150 hover:border-accent hover:text-[#F8FAFC]"
                        >
                          <span>
                            {locale === "es" ? "App de correo" : "Email app"}
                          </span>
                        </a>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#334155] bg-[#0E1116] px-5 text-xs font-semibold text-[#F8FAFC] transition-colors duration-150 hover:border-accent hover:text-[#22D3EE]"
                    >
                      <span>{dict.contact.form.resetAction}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-5 space-y-4"
                >
                  {/* Honeypot field for bot filtering */}
                  <div aria-hidden="true" className="sr-only">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(event) =>
                        handleFieldChange("website", event.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs font-medium text-[#CBD5E1]"
                      >
                        {dict.contact.form.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        disabled={status === "submitting"}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={
                          fieldErrors.name ? "contact-name-error" : undefined
                        }
                        placeholder={dict.contact.form.namePlaceholder}
                        value={values.name}
                        onChange={(event) =>
                          handleFieldChange("name", event.target.value)
                        }
                        className={inputClassName("name")}
                      />
                      {fieldErrors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="text-xs text-danger"
                        >
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs font-medium text-[#CBD5E1]"
                      >
                        {dict.contact.form.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={status === "submitting"}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={
                          fieldErrors.email ? "contact-email-error" : undefined
                        }
                        placeholder={dict.contact.form.emailPlaceholder}
                        value={values.email}
                        onChange={(event) =>
                          handleFieldChange("email", event.target.value)
                        }
                        className={inputClassName("email")}
                      />
                      {fieldErrors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="text-xs text-danger"
                        >
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono text-xs font-medium text-[#CBD5E1]"
                    >
                      {dict.contact.form.subjectLabel}
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      disabled={status === "submitting"}
                      aria-invalid={Boolean(fieldErrors.subject)}
                      aria-describedby={
                        fieldErrors.subject ? "contact-subject-error" : undefined
                      }
                      placeholder={dict.contact.form.subjectPlaceholder}
                      value={values.subject}
                      onChange={(event) =>
                        handleFieldChange("subject", event.target.value)
                      }
                      className={inputClassName("subject")}
                    />
                    {fieldErrors.subject && (
                      <p
                        id="contact-subject-error"
                        role="alert"
                        className="text-xs text-danger"
                      >
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs font-medium text-[#CBD5E1]"
                    >
                      {dict.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      disabled={status === "submitting"}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={
                        fieldErrors.message ? "contact-message-error" : undefined
                      }
                      placeholder={dict.contact.form.messagePlaceholder}
                      value={values.message}
                      onChange={(event) =>
                        handleFieldChange("message", event.target.value)
                      }
                      className={cn(inputClassName("message"), "resize-y")}
                    />
                    {fieldErrors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="text-xs text-danger"
                      >
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && serverMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-[4px] border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-xs text-danger"
                    >
                      <WarningCircle
                        size={16}
                        weight="bold"
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{serverMessage}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[46ch] text-[11px] leading-relaxed text-[#94A3B8]">
                      {dict.contact.form.simulationNote}
                    </p>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={
                        shouldReduceMotion || status === "submitting"
                          ? undefined
                          : { scale: 1.02 }
                      }
                      whileTap={
                        shouldReduceMotion || status === "submitting"
                          ? undefined
                          : { scale: 0.98 }
                      }
                      className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-xs font-bold tracking-wide text-accent-fg shadow-[0_4px_18px_-4px_rgba(6,182,212,0.45)] transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-65"
                    >
                      <PaperPlaneTilt
                        size={15}
                        weight="bold"
                        aria-hidden="true"
                      />
                      <span>
                        {status === "submitting"
                          ? dict.contact.form.submitPending
                          : dict.contact.form.submitIdle}
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Direct Channels & Bilingual CV Downloads */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Direct Channels Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.08, ease: EASE_PRECISE }
              }
              className="relative overflow-hidden rounded-[4px] border border-[#1E2530] bg-[#0E1116] p-5 sm:p-6"
            >
              <CardCornerDecor mirror />

              <div className="relative z-10 space-y-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#F8FAFC]">
                  {dict.contact.directTitle}
                </h3>

                {PROFILE.email ? (
                  <div className="flex items-center justify-between gap-2 rounded-[4px] border border-[#1E2530] bg-[#08090B] px-3.5 py-2.5">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-[#F8FAFC] transition-colors duration-150 hover:text-[#22D3EE]"
                    >
                      <EnvelopeSimple
                        size={18}
                        className="shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="truncate font-mono text-xs sm:text-sm">
                        {PROFILE.email}
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={
                        hasCopiedEmail
                          ? dict.contact.copyEmail.copied
                          : dict.contact.copyEmail.idle
                      }
                      title={
                        hasCopiedEmail
                          ? dict.contact.copyEmail.copied
                          : dict.contact.copyEmail.idle
                      }
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-150",
                        hasCopiedEmail
                          ? "border-accent bg-accent/15 text-[#22D3EE]"
                          : "border-[#1E2530] bg-[#0E1116] text-[#94A3B8] hover:border-accent hover:text-[#22D3EE]"
                      )}
                    >
                      {hasCopiedEmail ? (
                        <Check size={16} weight="bold" aria-hidden="true" />
                      ) : (
                        <Copy size={16} weight="bold" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="rounded-[4px] border border-[#1E2530] bg-[#08090B] p-3.5 text-xs text-[#94A3B8]">
                    {dict.contact.emailNotConfigured}
                  </p>
                )}

                {(linkedin || github || PROFILE.location) && (
                  <div className="flex flex-wrap gap-2.5">
                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#334155] bg-[#08090B] px-4 text-xs font-medium text-[#CBD5E1] transition-colors duration-150 hover:border-accent hover:text-[#F8FAFC]"
                      >
                        <LinkedinLogo size={16} aria-hidden="true" />
                        <span>LinkedIn</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}

                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#334155] bg-[#08090B] px-4 text-xs font-medium text-[#CBD5E1] transition-colors duration-150 hover:border-accent hover:text-[#F8FAFC]"
                      >
                        <GithubLogo size={16} aria-hidden="true" />
                        <span>GitHub</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}

                    {PROFILE.location && (
                      <span className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#1E2530] bg-[#08090B] px-4 font-mono text-xs text-[#94A3B8]">
                        <MapPin size={15} aria-hidden="true" />
                        <span>{PROFILE.location[locale]}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* CV Download Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 0.14, ease: EASE_PRECISE }
              }
              className="relative overflow-hidden rounded-[4px] border border-accent-border/45 bg-[#0E1116] p-5 sm:p-6"
            >
              <CardCornerDecor />

              <div className="relative z-10 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#F8FAFC]">
                    {dict.contact.cvPanelTitle}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#CBD5E1] sm:text-sm">
                    {dict.contact.cvPanelDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href={cvEs.href}
                    download={cvEs.downloadName}
                    className={cn(
                      "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-xs font-bold tracking-wide transition-[background-color,border-color,transform] duration-150 active:scale-[0.98]",
                      locale === "es"
                        ? "bg-accent text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] hover:bg-accent-hover"
                        : "border border-[#334155] bg-[#08090B] text-[#F8FAFC] hover:border-accent"
                    )}
                  >
                    <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                    <span>{dict.cv.downloadEs}</span>
                  </a>

                  <a
                    href={cvEn.href}
                    download={cvEn.downloadName}
                    className={cn(
                      "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-xs font-bold tracking-wide transition-[background-color,border-color,transform] duration-150 active:scale-[0.98]",
                      locale === "en"
                        ? "bg-accent text-accent-fg shadow-[0_4px_16px_-4px_rgba(6,182,212,0.45)] hover:bg-accent-hover"
                        : "border border-[#334155] bg-[#08090B] text-[#F8FAFC] hover:border-accent"
                    )}
                  >
                    <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                    <span>{dict.cv.downloadEn}</span>
                  </a>
                </div>

                <p className="font-mono text-[11px] text-[#94A3B8]">
                  {dict.cv.formatNote}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
