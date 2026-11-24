import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FORMSPREE_FORM_ID, IS_FORM_CONFIGURED } from "../config";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  timeline: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_VALUES: FormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  timeline: "",
  notes: "",
};

const FIELD_ORDER: (keyof FormValues)[] = [
  "name",
  "phone",
  "email",
  "address",
  "timeline",
  "notes",
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (digits.length < 10) {
    errors.phone = "That phone number looks incomplete.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.address.trim()) {
    errors.address = "Please enter the property address.";
  }
  return errors;
}

export default function LeadForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: keyof FormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      // Clear the field's error as soon as the user fixes it.
      if (errors[field]) {
        const nextErrors = { ...errors };
        delete nextErrors[field];
        setErrors(nextErrors);
      }
      if (status === "error") setStatus("idle");
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = FIELD_ORDER.find((field) => found[field]);
      if (first) document.getElementById(`field-${first}`)?.focus();
      return;
    }

    if (!IS_FORM_CONFIGURED) {
      // No Formspree form ID yet — see src/config.ts.
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          address: values.address.trim(),
          timeline: values.timeline,
          notes: values.notes.trim(),
          _subject: "New cash offer request — Kirby House Buyers",
        }),
      });
      if (!response.ok) throw new Error("Formspree request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3>Thanks — we&rsquo;ve got it.</h3>
        <p>
          We&rsquo;ll review your house and send your written cash offer
          within 24 hours. No obligation, and no pressure.
        </p>
        <button type="button" className="text-button" onClick={reset}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h2>Get your cash offer</h2>
        <p>Takes about 2 minutes. Written offer within 24 hours. No obligation.</p>
      </div>

      <div className="form-field">
        <label htmlFor="field-name">
          Your name <span aria-hidden="true">*</span>
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "error-name" : undefined}
          placeholder="Full name"
        />
        {errors.name && (
          <p className="form-error" id="error-name" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="field-phone">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update("phone")}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "error-phone" : undefined}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="form-error" id="error-phone" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="field-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="form-error" id="error-email" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="field-address">
          Property address <span aria-hidden="true">*</span>
        </label>
        <input
          id="field-address"
          name="address"
          type="text"
          autoComplete="street-address"
          value={values.address}
          onChange={update("address")}
          aria-required="true"
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? "error-address" : undefined}
          placeholder="Street address, city, ZIP"
        />
        {errors.address && (
          <p className="form-error" id="error-address" role="alert">
            {errors.address}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="field-timeline">
          How soon do you want to sell? <span className="optional">(optional)</span>
        </label>
        <select
          id="field-timeline"
          name="timeline"
          value={values.timeline}
          onChange={update("timeline")}
        >
          <option value="">Select one</option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="Within 30 days">Within 30 days</option>
          <option value="Within 2-3 months">Within 2–3 months</option>
          <option value="Just exploring">Just exploring for now</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="field-notes">
          Anything we should know? <span className="optional">(optional)</span>
        </label>
        <textarea
          id="field-notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={update("notes")}
          placeholder="Repairs needed, tenants, timeline, anything else"
        />
      </div>

      {/* Honeypot: hidden from real visitors, catches automated spam. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="field-gotcha">Leave this field empty</label>
        <input id="field-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="form-error form-error-banner" role="alert">
          Something went wrong sending your request. Please try again.
        </p>
      )}

      <button type="submit" className="submit-button" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Get my cash offer"}
      </button>
      <p className="form-note">
        No obligation. Your information stays private — we never sell it.
      </p>
    </form>
  );
}
