/// <reference types="@cloudflare/workers-types" />

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_TO_EMAIL?: string;
}

type FormKind = "contact" | "partnership" | "membership";

const SUBJECTS: Record<FormKind, string> = {
  contact: "Website enquiry",
  partnership: "Partnership enquiry",
  membership: "ESI membership application",
};

// Using Resend's sandbox sender until esi-eu.com is verified as a domain
// (see context/foundation/dns_change.md). In sandbox mode Resend only
// delivers to the account's own address, so DEFAULT_TO must stay the
// Resend account email until that's done — then switch both back.
const DEFAULT_FROM = "ESI Website <onboarding@resend.dev>";
const DEFAULT_TO = "theeuropeanstrategyinstitute@gmail.com";

function isFormKind(value: FormDataEntryValue | null): value is FormKind {
  return (
    value === "contact" || value === "partnership" || value === "membership"
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid form submission." }, 400);
  }

  // Honeypot: bots fill every field, real users never see this one.
  if (data.get("_gotcha")) {
    return jsonResponse({ ok: true });
  }

  const kind = data.get("formKind");
  if (!isFormKind(kind)) {
    return jsonResponse({ ok: false, error: "Unknown form type." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse(
      { ok: false, error: "Email service is not configured." },
      500,
    );
  }

  const fields = [...data.entries()].filter(
    ([key]) => key !== "formKind" && key !== "_gotcha" && key !== "privacy",
  );

  if (fields.length === 0) {
    return jsonResponse({ ok: false, error: "No form data received." }, 400);
  }

  const rows = fields
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 12px;font-weight:600;white-space:nowrap;">${escapeHtml(key)}</td><td style="padding:4px 12px;">${escapeHtml(String(value)).replace(/\n/g, "<br />")}</td></tr>`,
    )
    .join("");

  const nameField = String(data.get("Name") ?? "");
  const subject =
    kind === "contact" && nameField ? `Contact: ${nameField}` : SUBJECTS[kind];

  const replyTo = String(data.get("Email") ?? "");

  const payload: Record<string, unknown> = {
    from: env.RESEND_FROM_EMAIL ?? DEFAULT_FROM,
    to: [env.RESEND_TO_EMAIL ?? DEFAULT_TO],
    subject,
    html: `<table cellpadding="0" cellspacing="0">${rows}</table>`,
  };
  if (replyTo) {
    payload.reply_to = replyTo;
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error("Resend API error", resendResponse.status, errorBody);
    return jsonResponse({ ok: false, error: "Failed to send email." }, 502);
  }

  return jsonResponse({ ok: true });
};
