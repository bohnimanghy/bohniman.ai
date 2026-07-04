"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email."),
  company: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10, "Tell us a little more (10+ chars).").max(4000),
  // Honeypot — bots fill this, humans don't.
  website: z.string().max(0).optional().default(""),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const { name, email, company, message, website } = parsed.data;

  // Honeypot tripped — pretend success, drop silently.
  if (website) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Bohniman Site <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — logging submission instead:", {
      name,
      email,
      company,
      message,
    });
    return {
      ok: false,
      error:
        "Email isn't configured yet on the server. Please email hello@bohniman.com directly for now.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` · ${company}` : ""}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || "—"}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) {
      console.error("[contact] resend error:", error);
      return { ok: false, error: "Something went wrong sending your message. Try again." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { ok: false, error: "Something went wrong sending your message. Try again." };
  }
}
