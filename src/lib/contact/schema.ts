export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmissionPayload extends ContactPayload {
  botcheck: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ContactPayloadParseResult =
  | { success: true; data: ContactSubmissionPayload }
  | { success: false };

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContactPayload(
  payload: ContactPayload,
): ContactPayload {
  return {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    message: payload.message.trim(),
  };
}

export function validateContactPayload(
  payload: ContactPayload,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (payload.name.length < CONTACT_LIMITS.name.min) {
    errors.name = "Please enter your name.";
  } else if (payload.name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Name must be ${CONTACT_LIMITS.name.max} characters or fewer.`;
  }

  if (!payload.email) {
    errors.email = "Please enter your email address.";
  } else if (
    payload.email.length > CONTACT_LIMITS.email.max ||
    !EMAIL_PATTERN.test(payload.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (payload.message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.message.min} characters.`;
  } else if (payload.message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message must be ${CONTACT_LIMITS.message.max} characters or fewer.`;
  }

  return errors;
}

export function isValidEmailAddress(value: string): boolean {
  return (
    value.length <= CONTACT_LIMITS.email.max &&
    EMAIL_PATTERN.test(value)
  );
}

export function parseContactSubmission(
  value: unknown,
): ContactPayloadParseResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false };
  }

  const candidate = value as Record<string, unknown>;
  const botcheck = candidate.botcheck ?? false;

  if (
    typeof candidate.name !== "string" ||
    typeof candidate.email !== "string" ||
    typeof candidate.message !== "string" ||
    typeof botcheck !== "boolean"
  ) {
    return { success: false };
  }

  const payload = normalizeContactPayload({
    name: candidate.name,
    email: candidate.email,
    message: candidate.message,
  });

  if (Object.keys(validateContactPayload(payload)).length > 0) {
    return { success: false };
  }

  return {
    success: true,
    data: {
      ...payload,
      botcheck,
    },
  };
}
