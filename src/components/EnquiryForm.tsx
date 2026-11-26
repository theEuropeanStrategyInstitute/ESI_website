import { useState, type FormEvent } from "react";

type FormKind = "partnership" | "contact" | "membership";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function EnquiryForm({
  kind,
  compact = false,
}: {
  kind: FormKind;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function sendToResend(
    data: FormData,
    formKind: FormKind,
  ): Promise<boolean> {
    const payload = new FormData();
    for (const [key, value] of data.entries()) {
      payload.append(key, value);
    }
    payload.set("formKind", formKind);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: payload,
      });
      if (!response.ok) return false;
      const result = (await response.json()) as { ok?: boolean };
      return result.ok === true;
    } catch {
      return false;
    }
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots tend to fill every field, real users never see this one.
    if (data.get("_gotcha")) {
      return;
    }

    setStatus("submitting");
    const ok = await sendToResend(data, kind);
    if (ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  async function submitMembership(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots tend to fill every field, real users never see this one.
    if (data.get("_gotcha")) {
      return;
    }

    // Email and (for membership/partnership) the Google Sheet row are both
    // handled by /api/submit.
    setStatus("submitting");
    const ok = await sendToResend(data, "membership");
    if (ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  const onSubmit = kind === "membership" ? submitMembership : submitEnquiry;

  if (compact) {
    if (status === "success") {
      return (
        <div className="enquiry-form-success">
          <p>Thank you — we have received your message and will be in touch.</p>
        </div>
      );
    }

    return (
      <form className="enquiry-form enquiry-form-compact" onSubmit={onSubmit}>
        <div className="compact-row">
          <Field label="Name" name="Name" required />
          <Field label="Email address" name="Email" type="email" required />
        </div>
        <label className="message-field">
          <span>Message</span>
          <textarea name="Message" rows={1} required />
        </label>
        <input
          className="hp-field"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label className="privacy-check">
          <input name="privacy" type="checkbox" required />
          <span>
            I have read and accept the <a href="/privacy">Privacy notice</a>.
          </span>
        </label>
        <button
          className="form-submit"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Let's Collaborate"}{" "}
          <span aria-hidden="true">→</span>
        </button>
        {status === "error" && (
          <p className="form-error">
            Something went wrong sending your message. Please try again, or
            email us directly at{" "}
            <a href="mailto:partnerships@esi-eu.com">partnerships@esi-eu.com</a>
            .
          </p>
        )}
      </form>
    );
  }

  if (kind === "membership") {
    if (status === "success") {
      return (
        <div className="enquiry-form-success">
          <p>
            Thank you for your interest in ESI membership. We have received your
            details and the team will follow up directly.
          </p>
        </div>
      );
    }

    return (
      <form className="enquiry-form" onSubmit={submitMembership}>
        <div className="form-grid">
          <Field label="Name" name="Name" required />
          <Field label="Email address" name="Email" type="email" required />
          <Field label="Company" name="Company" required />
          <Field label="Phone number" name="Phone" type="tel" />
          <Field label="Country" name="Country" />
        </div>
        <label className="message-field">
          <span>Message</span>
          <textarea name="Message" rows={6} required />
        </label>
        <input
          className="hp-field"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label className="privacy-check">
          <input name="privacy" type="checkbox" required />
          <span>
            I have read and accept the <a href="/privacy">Privacy notice</a>.
          </span>
        </label>
        <button
          className="form-submit"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Let's Collaborate"}{" "}
          <span aria-hidden="true">→</span>
        </button>
        {status === "error" && (
          <p className="form-error">
            Something went wrong sending your application. Please try again, or
            email us directly at{" "}
            <a href="mailto:partnerships@esi-eu.com">partnerships@esi-eu.com</a>
            .
          </p>
        )}
        <p className="form-note">
          Your details are sent securely to the ESI team and are not shared with
          third parties.
        </p>
      </form>
    );
  }

  if (status === "success") {
    return (
      <div className="enquiry-form-success">
        <p>
          Thank you for reaching out. We have received your message and the team
          will follow up directly.
        </p>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={submitEnquiry}>
      <div className="form-grid">
        <Field label="Name" name="Name" required />
        <Field label="Email address" name="Email" type="email" required />
        <Field label="Company" name="Company" />
        <Field label="Phone number" name="Phone" type="tel" />
      </div>
      <label className="message-field">
        <span>Message</span>
        <textarea name="Message" rows={6} required />
      </label>
      <input
        className="hp-field"
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <label className="privacy-check">
        <input name="privacy" type="checkbox" required />
        <span>
          I have read and accept the <a href="/privacy">Privacy notice</a>.
        </span>
      </label>
      <button
        className="form-submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Let's Collaborate"}{" "}
        <span aria-hidden="true">→</span>
      </button>
      {status === "error" && (
        <p className="form-error">
          Something went wrong sending your message. Please try again, or email
          us directly at{" "}
          <a href="mailto:partnerships@esi-eu.com">partnerships@esi-eu.com</a>.
        </p>
      )}
      <p className="form-note">
        Your details are sent securely to the ESI team. The website does not
        store the information you enter.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span>{label}</span>
      <input name={name} type={type} required={required} />
    </label>
  );
}
