import type { FormEvent } from "react";

type FormKind = "partnership" | "contact" | "membership";

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
          Send <span aria-hidden="true">→</span>
        </button>
      </form>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={prepareEmail}>
      <div className="form-grid">
        {kind === "membership" ? (
          <>
            <Field label="First name" name="First name" required />
            <Field label="Last name" name="Last name" required />
          </>
        ) : (
          <Field label="Name" name="Name" required />
        )}
        <Field label="Email address" name="Email" type="email" required />
        <Field
          label="Company or institution"
          name="Company or institution"
          required={kind === "membership"}
        />
        <Field label="Phone number" name="Phone" type="tel" />
        {kind === "membership" && (
          <>
            <Field label="Website or LinkedIn" name="Website or LinkedIn" />
            <Field label="Country" name="Country" />
          </>
        )}
      </div>
      <label className="message-field">
        <span>{kind === "membership" ? "Message or notes" : "Message"}</span>
        <textarea name="Message" rows={6} required />
      </label>
      <label className="privacy-check">
        <input name="privacy" type="checkbox" required />
        <span>
          I have read and accept the <a href="/privacy">Privacy notice</a>.
        </span>
      </label>
      <button className="form-submit" type="submit">
        Prepare email <span aria-hidden="true">→</span>
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
