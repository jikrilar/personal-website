import type { APIRoute } from "astro";
import { parseContactSubmission } from "@/lib/contact/schema";
import {
  ContactEmailConfigurationError,
  sendContactEmail,
} from "@/lib/contact/send-contact-email";

export const prerender = false;

const MAX_REQUEST_BYTES = 16_384;

const jsonHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
};

function jsonResponse(
  body: { success: boolean; message: string },
  status: number,
  headers?: HeadersInit,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...headers },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const contentType =
    request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() ??
    "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (
    contentType !== "application/json" ||
    !Number.isFinite(contentLength) ||
    contentLength < 0 ||
    contentLength > MAX_REQUEST_BYTES
  ) {
    return jsonResponse(
      { success: false, message: "Please check your form input." },
      400,
    );
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(
      { success: false, message: "Please check your form input." },
      400,
    );
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return jsonResponse(
      { success: false, message: "Please check your form input." },
      400,
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      { success: false, message: "Please check your form input." },
      400,
    );
  }

  const parsed = parseContactSubmission(body);

  if (!parsed.success || parsed.data.website) {
    return jsonResponse(
      { success: false, message: "Please check your form input." },
      400,
    );
  }

  try {
    await sendContactEmail(parsed.data);

    return jsonResponse(
      { success: true, message: "Message sent successfully." },
      201,
    );
  } catch (error) {
    if (error instanceof ContactEmailConfigurationError) {
      console.error(`[contact] ${error.message}`);
    } else {
      console.error("[contact] Unable to deliver contact email.");
    }

    return jsonResponse(
      {
        success: false,
        message: "Unable to send your message right now.",
      },
      500,
    );
  }
};

export const ALL: APIRoute = () =>
  jsonResponse(
    { success: false, message: "Method not allowed." },
    405,
    { Allow: "POST" },
  );
