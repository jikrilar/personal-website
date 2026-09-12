import type {
  ContactResponse,
  ContactSubmissionPayload,
} from "@/lib/contact/schema";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const GENERIC_ERROR_MESSAGE =
  "Your message could not be sent. Please try again later.";

const SUCCESS_MESSAGE = "Message sent successfully.";

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

export class ContactSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactSubmissionError";
  }
}

function isWeb3FormsResponse(value: unknown): value is Web3FormsResponse {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const response = value as Partial<Web3FormsResponse>;

  return (
    typeof response.success === "boolean" &&
    (response.message === undefined || typeof response.message === "string")
  );
}

export async function submitContactMessage(
  payload: ContactSubmissionPayload,
  signal?: AbortSignal,
): Promise<ContactResponse> {
  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    throw new ContactSubmissionError(GENERIC_ERROR_MESSAGE);
  }

  let response: Response;

  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: payload.name,
        email: payload.email,
        message: payload.message,
        botcheck: payload.botcheck,
      }),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ContactSubmissionError(GENERIC_ERROR_MESSAGE);
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok || !isWeb3FormsResponse(body) || body.success !== true) {
    throw new ContactSubmissionError(GENERIC_ERROR_MESSAGE);
  }

  return {
    success: true,
    message:
      body.message?.trim() ||
      SUCCESS_MESSAGE,
  };
}
