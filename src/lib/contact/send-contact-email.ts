import { Resend, type ErrorResponse } from "resend";
import {
  CONTACT_FROM_EMAIL,
  CONTACT_FROM_NAME,
  CONTACT_TO_EMAIL,
  RESEND_API_KEY,
} from "astro:env/server";
import {
  isValidEmailAddress,
  type ContactSubmissionPayload,
} from "@/lib/contact/schema";

const DEFAULT_FROM_NAME = "Portfolio Contact";
const MAX_SEND_ATTEMPTS = 3;

interface ContactEmailConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
}

export class ContactEmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactEmailConfigurationError";
  }
}

export class ContactEmailDeliveryError extends Error {
  constructor() {
    super("Resend did not accept the contact email request.");
    this.name = "ContactEmailDeliveryError";
  }
}

function getContactEmailConfig(): ContactEmailConfig {
  const apiKey = RESEND_API_KEY?.trim();
  const fromEmail = CONTACT_FROM_EMAIL?.trim().toLowerCase();
  const toEmail = CONTACT_TO_EMAIL?.trim().toLowerCase();
  const fromName = CONTACT_FROM_NAME?.trim() || DEFAULT_FROM_NAME;

  const missing = [
    ["RESEND_API_KEY", apiKey],
    ["CONTACT_FROM_EMAIL", fromEmail],
    ["CONTACT_TO_EMAIL", toEmail],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new ContactEmailConfigurationError(
      `Missing contact email environment variables: ${missing.join(", ")}.`,
    );
  }

  if (
    !isValidEmailAddress(fromEmail!) ||
    !isValidEmailAddress(toEmail!) ||
    /[\r\n<>"]/u.test(fromName) ||
    fromName.length > 100
  ) {
    throw new ContactEmailConfigurationError(
      "Contact email sender or recipient configuration is invalid.",
    );
  }

  return {
    apiKey: apiKey!,
    fromEmail: fromEmail!,
    fromName,
    toEmail: toEmail!,
  };
}

function buildSubject(name: string): string {
  const safeName = name.replace(/[\r\n]+/gu, " ").slice(0, 80);
  return `New portfolio message from ${safeName}`;
}

function buildPlainText(payload: ContactSubmissionPayload): string {
  return [
    "New Portfolio Contact Message",
    "",
    "Name:",
    payload.name,
    "",
    "Email:",
    payload.email,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function isRetryable(error: ErrorResponse): boolean {
  return error.statusCode === 429 || (error.statusCode ?? 0) >= 500;
}

function waitBeforeRetry(attempt: number): Promise<void> {
  const delayMs = 500 * 2 ** attempt;
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export async function sendContactEmail(
  payload: ContactSubmissionPayload,
): Promise<{ id: string }> {
  const config = getContactEmailConfig();
  const resend = new Resend(config.apiKey);
  const idempotencyKey = `portfolio-contact/${payload.submissionId}`;

  for (let attempt = 0; attempt < MAX_SEND_ATTEMPTS; attempt += 1) {
    try {
      const { data, error } = await resend.emails.send(
        {
          from: `${config.fromName} <${config.fromEmail}>`,
          to: [config.toEmail],
          replyTo: payload.email,
          subject: buildSubject(payload.name),
          text: buildPlainText(payload),
        },
        { idempotencyKey },
      );

      if (!error && data?.id) {
        return { id: data.id };
      }

      if (error) {
        console.error("[contact] Resend rejected the email request.", {
          attempt: attempt + 1,
          errorName: error.name,
          statusCode: error.statusCode,
        });

        if (!isRetryable(error) || attempt === MAX_SEND_ATTEMPTS - 1) {
          throw new ContactEmailDeliveryError();
        }
      } else {
        console.error("[contact] Resend returned no email ID.", {
          attempt: attempt + 1,
        });
        throw new ContactEmailDeliveryError();
      }
    } catch (error) {
      if (error instanceof ContactEmailDeliveryError) {
        throw error;
      }

      console.error("[contact] Resend request failed before a response.", {
        attempt: attempt + 1,
      });

      if (attempt === MAX_SEND_ATTEMPTS - 1) {
        throw new ContactEmailDeliveryError();
      }
    }

    await waitBeforeRetry(attempt);
  }

  throw new ContactEmailDeliveryError();
}
