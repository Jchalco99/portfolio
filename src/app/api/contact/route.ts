import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  resolvePreferredLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  contactPayloadSchema,
  mapFieldErrors,
  type ContactApiResponse,
  type ContactPayload,
} from "@/lib/contact-schema";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_CLIENTS = 1_000;

const requestLogByIp = new Map<string, number[]>();

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  return realIp || "local-client";
}

function checkRateLimit(clientId: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  if (requestLogByIp.size >= MAX_TRACKED_CLIENTS) {
    for (const [key, timestamps] of requestLogByIp.entries()) {
      const active = timestamps.filter((ts) => ts > windowStart);
      if (active.length === 0) {
        requestLogByIp.delete(key);
      } else {
        requestLogByIp.set(key, active);
      }
    }
  }

  const recent = (requestLogByIp.get(clientId) ?? []).filter(
    (ts) => ts > windowStart
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = recent[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000)
    );
    requestLogByIp.set(clientId, recent);
    return { allowed: false, retryAfterSeconds };
  }

  recent.push(now);
  requestLogByIp.set(clientId, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

function resolveResponseLocale(
  rawBody: unknown,
  request: NextRequest
): Locale {
  if (
    rawBody &&
    typeof rawBody === "object" &&
    "locale" in rawBody &&
    typeof (rawBody as { locale?: unknown }).locale === "string"
  ) {
    const candidate = (rawBody as { locale: string }).locale;
    if (isLocale(candidate)) {
      return candidate;
    }
  }

  return resolvePreferredLocale(request.headers.get("accept-language"));
}

async function simulateContactDelivery(
  payload: ContactPayload
): Promise<{ id: string; receivedAt: string }> {
  // TODO: Conectar proveedor de correo real (Resend / Postmark / SMTP)
  void payload;
  return {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
  };
}

export async function POST(request: NextRequest) {
  const headerLocale = resolvePreferredLocale(
    request.headers.get("accept-language")
  );
  const clientId = getClientIdentifier(request);
  const limitStatus = checkRateLimit(clientId);

  if (!limitStatus.allowed) {
    const dict = getDictionary(headerLocale);
    const body: ContactApiResponse = {
      ok: false,
      code: "rate_limited",
      message: dict.contact.api.rateLimited,
    };
    return NextResponse.json(body, {
      status: 429,
      headers: {
        "Retry-After": String(limitStatus.retryAfterSeconds),
        "Cache-Control": "no-store",
      },
    });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    const dict = getDictionary(headerLocale);
    const body: ContactApiResponse = {
      ok: false,
      code: "invalid_json",
      message: dict.contact.api.invalidJson,
    };
    return NextResponse.json(body, {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
    const dict = getDictionary(headerLocale);
    const body: ContactApiResponse = {
      ok: false,
      code: "invalid_json",
      message: dict.contact.api.invalidJson,
    };
    return NextResponse.json(body, {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const locale = resolveResponseLocale(rawBody, request);
  const dict = getDictionary(locale);
  const parsed = contactPayloadSchema.safeParse({
    ...(rawBody as Record<string, unknown>),
    locale,
  });

  if (!parsed.success) {
    const body: ContactApiResponse = {
      ok: false,
      code: "validation_error",
      message: dict.contact.api.validationFailed,
      fieldErrors: mapFieldErrors(parsed.error, dict),
    };
    return NextResponse.json(body, {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  // Honeypot field filled by automated bots: acknowledge cleanly without dispatching.
  if (parsed.data.website.trim().length > 0) {
    const body: ContactApiResponse = {
      ok: true,
      mode: "simulated",
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      message: dict.contact.api.simulatedSuccess,
    };
    return NextResponse.json(body, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const receipt = await simulateContactDelivery(parsed.data);

  const body: ContactApiResponse = {
    ok: true,
    mode: "simulated",
    id: receipt.id,
    receivedAt: receipt.receivedAt,
    message: dict.contact.api.simulatedSuccess,
  };

  return NextResponse.json(body, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  const dict = getDictionary("en");
  const body: ContactApiResponse = {
    ok: false,
    code: "method_not_allowed",
    message: dict.contact.api.serverError,
  };

  return NextResponse.json(body, {
    status: 405,
    headers: {
      Allow: "POST",
      "Cache-Control": "no-store",
    },
  });
}
