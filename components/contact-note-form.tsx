"use client";

import { track } from "@vercel/analytics";
import { useState, type FormEvent } from "react";

// Uses the visitor's email app; no server storage or unapproved external processor.
export function ContactNoteForm({ directSend = false }: { directSend?: boolean }) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  async function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const intent = String(form.get("intent") || "A note");
    const message = String(form.get("message") || "").trim();
    if (directSend) {
      setPending(true);
      try {
        const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message, intent: String(form.get("intent") || ""), website: String(form.get("website") || "") }) });
        const result = await response.json();
        if (!response.ok || result.accepted !== true) throw new Error(result.error || "Sending failed.");
        track("contact_submit_success");
        setStatus("Accepted for sending. This does not yet confirm inbox delivery.");
      } catch {
        track("contact_submit_error");
        setStatus("Sending could not be confirmed. Please email Alex directly or try again.");
      } finally { setPending(false); }
      return;
    }
    track("contact_email_draft");
    const body = `${message}\n\n${name}\nReply to: ${email}`;
    window.location.href = `mailto:alex@inspirexchange.nl?subject=${encodeURIComponent(`${intent} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setStatus("Email draft requested. Review and send it in your email app. Nothing has been sent by this website.");
  }
  const fieldClass = "mt-2 block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-graphite/55 focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-4";
  return <form onSubmit={prepareEmail} className="min-w-0 rounded-sm border border-ink/10 bg-white p-5 sm:p-7" aria-label="Write Alex a note">
    <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-medium">Your name<input name="name" autoComplete="name" placeholder="The human, not regalia" maxLength={100} required className={fieldClass} /></label>
      <label className="block text-sm font-medium">Your email<input name="email" type="email" autoComplete="email" placeholder="Where my reply should land" maxLength={254} required className={fieldClass} /></label>
    </div>
    <label className="mt-6 block text-sm font-medium">What brings you here? <span className="font-normal text-graphite/60">(optional)</span><select name="intent" defaultValue="" className={fieldClass}><option value="">Choose, or just write below</option><option>A role or contract</option><option>A consultation</option><option>A partnership</option><option>A speaking invitation</option><option>Something else</option></select></label>
    <label className="mt-6 block text-sm font-medium">A little context<textarea name="message" placeholder="What are you working on, and where could I help?" maxLength={3000} required rows={4} className={`${fieldClass} resize-y`} /></label>
    <p className="mt-5 text-xs leading-5 text-graphite/65">{directSend ? "Your details are used to reply to this enquiry. Sending is processed by Resend. Please leave sensitive information out of this form." : "This opens a draft in your email app. Your note is not stored or sent by this website."}</p>
    <button disabled={pending} type="submit" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-md bg-electric px-6 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric">{pending ? "Sending…" : directSend ? "Send a note ↗" : "Open email draft ↗"}</button>
    <p role="status" aria-live="polite" className="mt-4 text-sm leading-6 text-graphite/75">{status}</p>
    <a href="mailto:alex@inspirexchange.nl" className="mt-2 inline-block text-sm text-electric underline underline-offset-4">Or email Alex directly</a>
  </form>;
}
