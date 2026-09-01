export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContactPayload(payload: ContactPayload): ContactPayload {
  return {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    message: payload.message.trim(),
  };
}

export function validateContactPayload(payload: ContactPayload): ContactFieldErrors {
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
