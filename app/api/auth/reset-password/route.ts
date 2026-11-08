import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      return NextResponse.json(
        { success: false, error: "Supabase configuration is missing." },
        { status: 500 }
      );
    }

    // Determine the base URL for the password reset redirect
    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
    const redirectTo = `${origin}/reset-password`;

    let resetLink: string | null = null;

    // ── SCENARIO A: Generate recovery action link via Supabase Admin API ──
    // This allows our Free Mailer (Nodemailer) to send the email directly,
    // avoiding Supabase's strict rate limits (3 emails/hour on free tier).
    if (serviceRoleKey) {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email: cleanEmail,
        options: {
          redirectTo,
        },
      });

      if (error) {
        console.error("Supabase generateLink error:", error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      }

      resetLink = data?.properties?.action_link || null;
    }

    // ── SCENARIO B: Fallback if SUPABASE_SERVICE_ROLE_KEY is not yet in .env ──
    if (!resetLink) {
      const supabase = createClient(
        supabaseUrl,
        serviceRoleKey || anonKey || ""
      );

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo,
      });

      if (error) {
        console.error("Supabase resetPasswordForEmail error:", error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message:
          "Password reset request dispatched to your email via Supabase Auth.",
      });
    }

    // ── FREE MAILER CALL ──
    // Called ONLY in this password reset link generation scenario!
    await sendPasswordResetEmail({
      to: cleanEmail,
      resetLink,
    });

    return NextResponse.json({
      success: true,
      message: "Password reset link sent to your email successfully.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process password reset request." },
      { status: 500 }
    );
  }
}

