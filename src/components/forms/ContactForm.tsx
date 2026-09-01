import { useEffect, useRef, useState, type SubmitEvent } from "react";
import {
  CONTACT_LIMITS,
  normalizeContactPayload,
  validateContactPayload,
  type ContactFieldErrors,
  type ContactPayload,
} from "@/lib/contact/schema";
import {
  ContactSubmissionError,
  submitContactMessage,
} from "@/lib/contact/submit-contact";
import "./ContactForm.css";

type SubmissionStatus = "idle" | "loading" | "success" | "error";

const EMPTY_FORM: ContactPayload = {
  name: "",
  email: "",
  message: "",
};

const FIELD_ORDER: Array<keyof ContactPayload> = ["name", "email", "message"];

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const submittingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  function updateField(field: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status === "error" || status === "success") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function focusFirstInvalidField(
    form: HTMLFormElement,
    errors: ContactFieldErrors,
  ) {
    const firstInvalidField = FIELD_ORDER.find((field) => errors[field]);
    const control = firstInvalidField
      ? form.elements.namedItem(firstInvalidField)
      : null;

    if (control instanceof HTMLElement) {
      control.focus();
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const form = event.currentTarget;
    const payload = normalizeContactPayload(values);
    const errors = validateContactPayload(payload);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Please review the highlighted fields.");
      focusFirstInvalidField(form, errors);
      return;
    }

    submittingRef.current = true;
    abortControllerRef.current = new AbortController();
    setFieldErrors({});
    setStatus("loading");
    setStatusMessage("Sending your message...");

    try {
      const response = await submitContactMessage(
        payload,
        abortControllerRef.current.signal,
      );

      setValues(EMPTY_FORM);
      setStatus("success");
      setStatusMessage(response.message);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      setStatus("error");
      setStatusMessage(
        error instanceof ContactSubmissionError
          ? error.message
          : "Your message could not be sent. Please try again later.",
      );
    } finally {
      submittingRef.current = false;
      abortControllerRef.current = null;
    }
  }

  return (
    <form
      className="contact-form"
      method="post"
      action="/api/contact"
      onSubmit={handleSubmit}
      aria-busy={status === "loading"}
    >
      <div className="contact-form__field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={CONTACT_LIMITS.name.min}
          maxLength={CONTACT_LIMITS.name.max}
          placeholder="Your name"
          value={values.name}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          onChange={(event) => updateField("name", event.target.value)}
        />
        {fieldErrors.name && (
          <p id="contact-name-error" className="contact-form__field-error">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={CONTACT_LIMITS.email.max}
          inputMode="email"
          placeholder="you@example.com"
          value={values.email}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          onChange={(event) => updateField("email", event.target.value)}
        />
        {fieldErrors.email && (
          <p id="contact-email-error" className="contact-form__field-error">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={CONTACT_LIMITS.message.min}
          maxLength={CONTACT_LIMITS.message.max}
          rows={7}
          placeholder="Tell me what you would like to discuss."
          value={values.message}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          onChange={(event) => updateField("message", event.target.value)}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="contact-form__field-error">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div className="contact-form__actions">
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        <p
          className="contact-form__status"
          data-status={status}
          aria-live="polite"
          aria-atomic="true"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
