import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as setOnSetGetEnv, n as getEnv$1, t as createInvalidVariablesError } from "./runtime_BXOah7Gq.mjs";
import { Resend } from "resend";
//#region node_modules/astro/dist/env/validators.js
function getEnvFieldType(options) {
	const optional = options.optional ? options.default !== void 0 ? false : true : false;
	let type;
	if (options.type === "enum") type = options.values.map((v) => `'${v}'`).join(" | ");
	else type = options.type;
	return `${type}${optional ? " | undefined" : ""}`;
}
var stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
	if (typeof input !== "string") return {
		ok: false,
		errors: ["type"]
	};
	const errors = [];
	if (max !== void 0 && !(input.length <= max)) errors.push("max");
	if (min !== void 0 && !(input.length >= min)) errors.push("min");
	if (length !== void 0 && !(input.length === length)) errors.push("length");
	if (url !== void 0 && !URL.canParse(input)) errors.push("url");
	if (includes !== void 0 && !input.includes(includes)) errors.push("includes");
	if (startsWith !== void 0 && !input.startsWith(startsWith)) errors.push("startsWith");
	if (endsWith !== void 0 && !input.endsWith(endsWith)) errors.push("endsWith");
	if (errors.length > 0) return {
		ok: false,
		errors
	};
	return {
		ok: true,
		value: input
	};
};
var numberValidator = ({ gt, min, lt, max, int }) => (input) => {
	const num = Number.parseFloat(input ?? "");
	if (isNaN(num)) return {
		ok: false,
		errors: ["type"]
	};
	const errors = [];
	if (gt !== void 0 && !(num > gt)) errors.push("gt");
	if (min !== void 0 && !(num >= min)) errors.push("min");
	if (lt !== void 0 && !(num < lt)) errors.push("lt");
	if (max !== void 0 && !(num <= max)) errors.push("max");
	if (int !== void 0) {
		const isInt = Number.isInteger(num);
		if (!(int ? isInt : !isInt)) errors.push("int");
	}
	if (errors.length > 0) return {
		ok: false,
		errors
	};
	return {
		ok: true,
		value: num
	};
};
var booleanValidator = (input) => {
	const bool = input === "true" ? true : input === "false" ? false : void 0;
	if (typeof bool !== "boolean") return {
		ok: false,
		errors: ["type"]
	};
	return {
		ok: true,
		value: bool
	};
};
var enumValidator = ({ values }) => (input) => {
	if (!(typeof input === "string" ? values.includes(input) : false)) return {
		ok: false,
		errors: ["type"]
	};
	return {
		ok: true,
		value: input
	};
};
function selectValidator(options) {
	switch (options.type) {
		case "string": return stringValidator(options);
		case "number": return numberValidator(options);
		case "boolean": return booleanValidator;
		case "enum": return enumValidator(options);
	}
}
function validateEnvVariable(value, options) {
	const isOptional = options.optional || options.default !== void 0;
	if (isOptional && value === void 0) return {
		ok: true,
		value: options.default
	};
	if (!isOptional && value === void 0) return {
		ok: false,
		errors: ["missing"]
	};
	return selectValidator(options)(value);
}
//#endregion
//#region src/lib/contact/schema.ts
var CONTACT_LIMITS = {
	name: {
		min: 2,
		max: 120
	},
	email: { max: 254 },
	message: {
		min: 10,
		max: 5e3
	}
};
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var SUBMISSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function normalizeContactPayload(payload) {
	return {
		name: payload.name.trim(),
		email: payload.email.trim().toLowerCase(),
		message: payload.message.trim()
	};
}
function validateContactPayload(payload) {
	const errors = {};
	if (payload.name.length < CONTACT_LIMITS.name.min) errors.name = "Please enter your name.";
	else if (payload.name.length > CONTACT_LIMITS.name.max) errors.name = `Name must be ${CONTACT_LIMITS.name.max} characters or fewer.`;
	if (!payload.email) errors.email = "Please enter your email address.";
	else if (payload.email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(payload.email)) errors.email = "Please enter a valid email address.";
	if (payload.message.length < CONTACT_LIMITS.message.min) errors.message = `Message must be at least ${CONTACT_LIMITS.message.min} characters.`;
	else if (payload.message.length > CONTACT_LIMITS.message.max) errors.message = `Message must be ${CONTACT_LIMITS.message.max} characters or fewer.`;
	return errors;
}
function isValidEmailAddress(value) {
	return value.length <= CONTACT_LIMITS.email.max && EMAIL_PATTERN.test(value);
}
function parseContactSubmission(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return { success: false };
	const candidate = value;
	const website = candidate.website ?? "";
	const submissionId = candidate.submissionId ?? crypto.randomUUID();
	if (typeof candidate.name !== "string" || typeof candidate.email !== "string" || typeof candidate.message !== "string" || typeof website !== "string" || typeof submissionId !== "string") return { success: false };
	const payload = normalizeContactPayload({
		name: candidate.name,
		email: candidate.email,
		message: candidate.message
	});
	if (Object.keys(validateContactPayload(payload)).length > 0 || website.length > 200 || !SUBMISSION_ID_PATTERN.test(submissionId)) return { success: false };
	return {
		success: true,
		data: {
			...payload,
			website: website.trim(),
			submissionId
		}
	};
}
//#endregion
//#region \0virtual:astro:env/internal
var schema = {
	"RESEND_API_KEY": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	},
	"CONTACT_FROM_NAME": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	},
	"CONTACT_FROM_EMAIL": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	},
	"CONTACT_TO_EMAIL": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	}
};
//#endregion
//#region \0astro:env/server
/** @returns {string} */
var getEnv = (key) => {
	return getEnv$1(key);
};
var _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === "" ? void 0 : rawVariable;
	const options = schema[key];
	const result = validateEnvVariable(variable, options);
	if (result.ok) return result.value;
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};
setOnSetGetEnv(() => {
	RESEND_API_KEY = _internalGetSecret("RESEND_API_KEY");
	CONTACT_FROM_NAME = _internalGetSecret("CONTACT_FROM_NAME");
	CONTACT_FROM_EMAIL = _internalGetSecret("CONTACT_FROM_EMAIL");
	CONTACT_TO_EMAIL = _internalGetSecret("CONTACT_TO_EMAIL");
});
var RESEND_API_KEY = _internalGetSecret("RESEND_API_KEY");
var CONTACT_FROM_NAME = _internalGetSecret("CONTACT_FROM_NAME");
var CONTACT_FROM_EMAIL = _internalGetSecret("CONTACT_FROM_EMAIL");
var CONTACT_TO_EMAIL = _internalGetSecret("CONTACT_TO_EMAIL");
//#endregion
//#region src/lib/contact/send-contact-email.ts
var DEFAULT_FROM_NAME = "Portfolio Contact";
var MAX_SEND_ATTEMPTS = 3;
var ContactEmailConfigurationError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ContactEmailConfigurationError";
	}
};
var ContactEmailDeliveryError = class extends Error {
	constructor() {
		super("Resend did not accept the contact email request.");
		this.name = "ContactEmailDeliveryError";
	}
};
function getContactEmailConfig() {
	const apiKey = RESEND_API_KEY?.trim();
	const fromEmail = CONTACT_FROM_EMAIL?.trim().toLowerCase();
	const toEmail = CONTACT_TO_EMAIL?.trim().toLowerCase();
	const fromName = CONTACT_FROM_NAME?.trim() || DEFAULT_FROM_NAME;
	const missing = [
		["RESEND_API_KEY", apiKey],
		["CONTACT_FROM_EMAIL", fromEmail],
		["CONTACT_TO_EMAIL", toEmail]
	].filter(([, value]) => !value).map(([name]) => name);
	if (missing.length > 0) throw new ContactEmailConfigurationError(`Missing contact email environment variables: ${missing.join(", ")}.`);
	if (!isValidEmailAddress(fromEmail) || !isValidEmailAddress(toEmail) || /[\r\n<>"]/u.test(fromName) || fromName.length > 100) throw new ContactEmailConfigurationError("Contact email sender or recipient configuration is invalid.");
	return {
		apiKey,
		fromEmail,
		fromName,
		toEmail
	};
}
function buildSubject(name) {
	return `New portfolio message from ${name.replace(/[\r\n]+/gu, " ").slice(0, 80)}`;
}
function buildPlainText(payload) {
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
		payload.message
	].join("\n");
}
function isRetryable(error) {
	return error.statusCode === 429 || (error.statusCode ?? 0) >= 500;
}
function waitBeforeRetry(attempt) {
	const delayMs = 500 * 2 ** attempt;
	return new Promise((resolve) => setTimeout(resolve, delayMs));
}
async function sendContactEmail(payload) {
	const config = getContactEmailConfig();
	const resend = new Resend(config.apiKey);
	const idempotencyKey = `portfolio-contact/${payload.submissionId}`;
	for (let attempt = 0; attempt < MAX_SEND_ATTEMPTS; attempt += 1) {
		try {
			const { data, error } = await resend.emails.send({
				from: `${config.fromName} <${config.fromEmail}>`,
				to: [config.toEmail],
				replyTo: payload.email,
				subject: buildSubject(payload.name),
				text: buildPlainText(payload)
			}, { idempotencyKey });
			if (!error && data?.id) return { id: data.id };
			if (error) {
				console.error("[contact] Resend rejected the email request.", {
					attempt: attempt + 1,
					errorName: error.name,
					statusCode: error.statusCode
				});
				if (!isRetryable(error) || attempt === 2) throw new ContactEmailDeliveryError();
			} else {
				console.error("[contact] Resend returned no email ID.", { attempt: attempt + 1 });
				throw new ContactEmailDeliveryError();
			}
		} catch (error) {
			if (error instanceof ContactEmailDeliveryError) throw error;
			console.error("[contact] Resend request failed before a response.", { attempt: attempt + 1 });
			if (attempt === 2) throw new ContactEmailDeliveryError();
		}
		await waitBeforeRetry(attempt);
	}
	throw new ContactEmailDeliveryError();
}
//#endregion
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	POST: () => POST,
	prerender: () => false
});
var MAX_REQUEST_BYTES = 16384;
var jsonHeaders = {
	"Cache-Control": "no-store",
	"Content-Type": "application/json; charset=utf-8"
};
function jsonResponse(body, status, headers) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			...jsonHeaders,
			...headers
		}
	});
}
var POST = async ({ request }) => {
	const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() ?? "";
	const contentLength = Number(request.headers.get("content-length") ?? 0);
	if (contentType !== "application/json" || !Number.isFinite(contentLength) || contentLength < 0 || contentLength > MAX_REQUEST_BYTES) return jsonResponse({
		success: false,
		message: "Please check your form input."
	}, 400);
	let rawBody;
	try {
		rawBody = await request.text();
	} catch {
		return jsonResponse({
			success: false,
			message: "Please check your form input."
		}, 400);
	}
	if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) return jsonResponse({
		success: false,
		message: "Please check your form input."
	}, 400);
	let body;
	try {
		body = JSON.parse(rawBody);
	} catch {
		return jsonResponse({
			success: false,
			message: "Please check your form input."
		}, 400);
	}
	const parsed = parseContactSubmission(body);
	if (!parsed.success || parsed.data.website) return jsonResponse({
		success: false,
		message: "Please check your form input."
	}, 400);
	try {
		await sendContactEmail(parsed.data);
		return jsonResponse({
			success: true,
			message: "Message sent successfully."
		}, 201);
	} catch (error) {
		if (error instanceof ContactEmailConfigurationError) console.error(`[contact] ${error.message}`);
		else console.error("[contact] Unable to deliver contact email.");
		return jsonResponse({
			success: false,
			message: "Unable to send your message right now."
		}, 500);
	}
};
var ALL = () => jsonResponse({
	success: false,
	message: "Method not allowed."
}, 405, { Allow: "POST" });
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
