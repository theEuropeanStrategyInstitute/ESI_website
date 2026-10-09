import { useState, type FormEvent } from "react";

type FormKind = "partnership" | "contact" | "membership";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const subjects: Record<FormKind, string> = {
  partnership: "Partnership enquiry",
  contact: "Website enquiry",
  membership: "ESI membership application",
};

export function EnquiryForm({
  kind,
  compact = false,
}: {
  kind: FormKind;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = [...data.entries()]
      .filter(([key]) => key !== "privacy")
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join("\n");

    const subject =
      kind === "contact"
        ? `Contact: ${String(data.get("Name") ?? "")}`
        : subjects[kind];

    window.location.href =
      "mailto:partnerships@esi-eu.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(entries);
  }

  async function submitMembership(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots tend to fill every field, real users never see this one.
    if (data.get("_gotcha")) {
      return;
    }

    const endpoint = import.meta.env.PUBLIC_MEMBERSHIP_FORM_URL;
    if (!endpoint) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, { method: "POST", body: data });
      const result = (await response.json()) as { result?: string };
      if (result.result !== "success") {
        throw new Error("Unexpected response from form endpoint");
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (compact) {
    return (
      <form
        className="enquiry-form enquiry-form-compact"
        onSubmit={prepareEmail}
      >
        <div className="compact-row">
          <Field label="Name" name="Name" required />
          <Field label="Email address" name="Email" type="email" required />
        </div>
        <label className="message-field">
          <span>Message</span>
          <textarea name="Message" rows={1} required />
        </label>
        <label className="privacy-check">
          <input name="privacy" type="checkbox" required />
          <span>
            I have read and accept the <a href="/privacy">Privacy notice</a>.
          </span>
        </label>
        <button className="form-submit" type="submit">
          Let&apos;s Collaborate <span aria-hidden="true">→</span>
        </button>
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
          <Field label="First name" name="First name" required />
          <Field label="Last name" name="Last name" required />
          <Field label="Email address" name="Email" type="email" required />
          <Field
            label="Company or institution"
            name="Company or institution"
            required
          />
          <Field label="Phone number" name="Phone" type="tel" />
          <Field label="Website or LinkedIn" name="Website or LinkedIn" />
          <Field label="Country" name="Country" />
        </div>
        <label className="message-field">
          <span>Message or notes</span>
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

  return (
    <form className="enquiry-form" onSubmit={prepareEmail}>
      <div className="form-grid">
        <Field label="Name" name="Name" required />
        <Field label="Email address" name="Email" type="email" required />
        <Field label="Company or institution" name="Company or institution" />
        <Field label="Phone number" name="Phone" type="tel" />
      </div>
      <label className="message-field">
        <span>Message</span>
        <textarea name="Message" rows={6} required />
      </label>
      <label className="privacy-check">
        <input name="privacy" type="checkbox" required />
        <span>
          I have read and accept the <a href="/privacy">Privacy notice</a>.
        </span>
      </label>
      <button className="form-submit" type="submit">
        Let's Collaborate <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        This form opens a draft in your email application. The website does not
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
