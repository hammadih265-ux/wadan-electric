"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Lock, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Listen to Auth State change (Supabase exchanges recovery token automatically)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setSessionReady(true);
      }
    });

    // Check if session is already present
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast.success("Password updated successfully!");

      // Clear any lockout storage
      try {
        localStorage.removeItem("wadan_admin_login_attempts");
        localStorage.removeItem("wadan_admin_login_lockout_until");
      } catch {
        // ignore
      }

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to reset password.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden transition-colors">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] mb-3 shadow-lg shadow-[#d4af37]/20">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={35}
              priority
              unoptimized
            />
          </div>
          <h1 className="text-neutral-900 dark:text-white text-lg font-semibold tracking-wide">
            Wadan Electronics
          </h1>
          <p className="text-neutral-500 dark:text-[#888] text-xs mt-1">
            Choose a New Password
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border p-8 bg-white dark:bg-[#111] border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-colors">
          {isSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                Password Successfully Reset!
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                You can now log in to the admin portal with your new password.
                Redirecting to login...
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold text-xs shadow-md"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <KeyRound className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-neutral-900 dark:text-white font-semibold text-base">
                  Set New Password
                </h2>
              </div>

              {!sessionReady && (
                <div className="mb-4 rounded-xl p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs">
                  Authenticating recovery link session... If this does not update, please ensure you opened the link directly from your email.
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-xs font-medium text-neutral-600 dark:text-[#888] uppercase tracking-widest mb-2"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="admin-input"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-xs font-medium text-neutral-600 dark:text-[#888] uppercase tracking-widest mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="admin-input"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-medium text-sm text-black transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: loading
                      ? "rgba(212,175,55,0.6)"
                      : "linear-gradient(135deg,#d4af37,#b8941f)",
                    boxShadow: loading
                      ? "none"
                      : "0 8px 24px rgba(212,175,55,0.25)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4 animate-spin" />
                      Updating Password…
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#d4af37] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

