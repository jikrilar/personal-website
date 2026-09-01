import type { ContactPayload, ContactResponse } from "@/lib/contact/schema";

export const CONTACT_ENDPOINT = "/api/contact";

export class ContactSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactSubmissionError";
  }
}

function isContactResponse(value: unknown): value is ContactResponse {
  if (!value || typeof value !== "object") return false;

  const response = value as Partial<ContactResponse>;
  return typeof response.success === "boolean" && typeof response.message === "string";
}

export async function submitContactMessage(
  payload: ContactPayload,
  signal?: AbortSignal,
): Promise<ContactResponse> {
  let response: Response;

  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ContactSubmissionError(
      "Message delivery is unavailable right now. Please try again later.",
    );
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok || !isContactResponse(body) || !body.success) {
    const message =
      isContactResponse(body) && body.message
        ? body.message
        : "Message delivery is not configured yet. Please try again later.";

    throw new ContactSubmissionError(message);
  }

  return body;
}
