"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initial: ContactState = { ok: false };

const inputClass =
  "w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-[#A6A399] focus:border-accent";
const labelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-mono";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-6 py-[14px] text-[15px] font-medium text-canvas transition-colors hover:bg-[#2A2D34] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
      <span className="font-mono">&rarr;</span>
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-line bg-canvas-soft p-10">
        <div className="mb-3 font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
          Message sent
        </div>
        <h3 className="m-0 mb-3 font-display text-[26px] font-bold tracking-[-0.01em] text-ink">
          Thanks — we&apos;ll be in touch.
        </h3>
        <p className="m-0 text-[16px] leading-[1.6] text-muted">
          Your message reached our team. We typically reply within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6">
      {state.error && (
        <div className="rounded-[10px] border border-[#E7C4B6] bg-[#FBEEE8] px-4 py-3 text-[14px] text-[#8A3A1E]">
          {state.error}
        </div>
      )}

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Your name" />
          {state.fieldErrors?.name && (
            <p className="mt-2 text-[13px] text-[#8A3A1E]">{state.fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@company.com" />
          {state.fieldErrors?.email && (
            <p className="mt-2 text-[13px] text-[#8A3A1E]">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company <span className="normal-case text-[#B9B6AC]">(optional)</span>
        </label>
        <input id="company" name="company" className={inputClass} placeholder="Organisation" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y`}
          placeholder="Tell us about your project or which product you're interested in…"
        />
        {state.fieldErrors?.message && (
          <p className="mt-2 text-[13px] text-[#8A3A1E]">{state.fieldErrors.message}</p>
        )}
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
