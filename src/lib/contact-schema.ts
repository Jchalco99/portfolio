import { z } from "zod";
import type { ContactErrorCode, Dictionary } from "@/i18n/types";

export const CONTACT_FIELD_NAMES = [
  "name",
  "email",
  "subject",
  "message",
] as const;

export type ContactFieldName = (typeof CONTACT_FIELD_NAMES)[number];

const CONTACT_ERROR_CODES = new Set<string>([
  "name_too_short",
  "name_too_long",
  "email_invalid",
  "subject_too_short",
  "subject_too_long",
  "message_too_short",
  "message_too_long",
]);

export const contactPayloadSchema = z.object({
  name: z
    .string({ error: "name_too_short" })
    .trim()
    .min(2, { error: "name_too_short" })
    .max(100, { error: "name_too_long" }),
  email: z
    .string({ error: "email_invalid" })
    .trim()
    .max(254, { error: "email_invalid" })
    .pipe(z.email({ error: "email_invalid" })),
  subject: z
    .string({ error: "subject_too_short" })
    .trim()
    .min(3, { error: "subject_too_short" })
    .max(140, { error: "subject_too_long" }),
  message: z
    .string({ error: "message_too_short" })
    .trim()
    .min(15, { error: "message_too_short" })
    .max(3000, { error: "message_too_long" }),
  locale: z.enum(["es", "en"]).default("es"),
  website: z.string().max(200).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ContactApiResponse =
  | {
      ok: true;
      mode: "simulated";
      id: string;
      receivedAt: string;
      message: string;
    }
  | {
      ok: false;
      code:
        | "invalid_json"
        | "validation_error"
        | "rate_limited"
        | "method_not_allowed"
        | "server_error";
      message: string;
      fieldErrors?: ContactFieldErrors;
    };

function resolveErrorMessage(rawCode: string, dictionary: Dictionary): string {
  if (CONTACT_ERROR_CODES.has(rawCode)) {
    return dictionary.contact.validation[rawCode as ContactErrorCode];
  }
  return dictionary.contact.api.validationFailed;
}

/**
 * Flattens a Zod v4 validation error into localized per-field messages
 * suitable for both client validation and /api/contact error responses.
 */
export function mapFieldErrors(
  error: z.ZodError<ContactPayload>,
  dictionary: Dictionary
): ContactFieldErrors {
  const flattened = z.flattenError(error);
  const mapped: ContactFieldErrors = {};

  for (const field of CONTACT_FIELD_NAMES) {
    const messages = flattened.fieldErrors[field];
    if (messages && messages.length > 0) {
      mapped[field] = resolveErrorMessage(messages[0], dictionary);
    }
  }

  return mapped;
}
