import nodemailer from "nodemailer";
import { PasswordResetEmailTemplate } from "@/lib/emails/templates";

// ── Brevo (Sendinblue) & Free Mailer Configuration ───────────

/**
 * Dispatch an email via Brevo REST API (v3).
 * This is recommended because HTTP API calls bypass SMTP port blocking
 * on hosting providers like Vercel, Netlify, and Render.
 */
async function sendViaBrevoApi({
  apiKey,
  to,
  subject,
  html,
}: {
  apiKey: string;
  to: string;
  subject: string;
  html: string;
}) {
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL ||
    process.env.FROM_EMAIL ||
    "wadanelectrics@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Wadan Electronics";

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const errorMsg =
      errorJson.message ||
      `Brevo API responded with status ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  const result = await response.json().catch(() => ({ success: true }));
  return { success: true, ...result };
}

// ── Fallback SMTP Transporter (Brevo SMTP or Gmail SMTP) ─────
function getTransporter() {
  const isBrevoSmtp = Boolean(
    process.env.BREVO_SMTP_USER || process.env.BREVO_SMTP_KEY
  );

  const host =
    process.env.BREVO_SMTP_HOST ||
    process.env.SMTP_HOST ||
    (isBrevoSmtp ? "smtp-relay.brevo.com" : "smtp.gmail.com");

  const port =
    Number(process.env.BREVO_SMTP_PORT || process.env.SMTP_PORT) ||
    (host.includes("brevo") ? 587 : 465);

  const user = process.env.BREVO_SMTP_USER || process.env.SMTP_USER;
  const pass = process.env.BREVO_SMTP_KEY || process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Universal email sender.
 * Tries Brevo REST API first (if BREVO_API_KEY is present),
 * then falls back to Brevo SMTP / standard SMTP.
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // Option 1: Brevo REST API
  const brevoApiKey = process.env.BREVO_API_KEY?.trim();
  if (brevoApiKey) {
    try {
      return await sendViaBrevoApi({
        apiKey: brevoApiKey,
        to,
        subject,
        html,
      });
    } catch (apiErr) {
      console.error("[Brevo API Dispatch Error]:", apiErr);
      throw apiErr;
    }
  }

  // Option 2: Brevo SMTP Relay or Generic SMTP
  const smtpUser =
    process.env.BREVO_SMTP_USER?.trim() || process.env.SMTP_USER?.trim();
  const smtpPass =
    process.env.BREVO_SMTP_KEY?.trim() || process.env.SMTP_PASS?.trim();

  if (!smtpUser || !smtpPass) {
    console.warn(
      `[Mailer Alert] Neither BREVO_API_KEY nor SMTP credentials (BREVO_SMTP_USER / BREVO_SMTP_KEY) are set in .env. Simulated sending to ${to}: "${subject}"`
    );
    return { success: false, simulated: true };
  }

  const senderEmail =
    process.env.BREVO_SENDER_EMAIL ||
    process.env.FROM_EMAIL ||
    smtpUser;
  const senderName = process.env.BREVO_SENDER_NAME || "Wadan Electronics";

  const transporter = getTransporter();

  return transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to,
    subject,
    html,
  });
}

/**
 * Sends a password reset email containing the secure Supabase recovery link.
 * This is called ONLY when the password reset scenario link is generated.
 */
export async function sendPasswordResetEmail({
  to,
  resetLink,
}: {
  to: string;
  resetLink: string;
}) {
  const formattedTime = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = PasswordResetEmailTemplate(resetLink, formattedTime, to);

  return sendEmail({
    to,
    subject: "🔐 Reset Your Wadan Electronics Admin Password",
    html,
  });
}
