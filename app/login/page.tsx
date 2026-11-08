"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInAdmin } from "@/services/auth";
import Image from "next/image";
import { toast } from "sonner";
import { ShieldAlert, Lock, AlertTriangle, CheckCircle2, ArrowLeft, Mail } from "lucide-react";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_ATTEMPTS_KEY = "wadan_admin_login_attempts";
const STORAGE_LOCKOUT_KEY = "wadan_admin_login_lockout_until";

function formatRemainingTime(lockoutUntil: number): string {
  const diff = Math.max(0, Math.floor((lockoutUntil - Date.now()) / 1000));
  const mins = Math.floor(diff / 60);
  const secs = diff % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function getInitialLockoutState(): {
  isLocked: boolean;
  failedAttempts: number;
  lockoutRemaining: string;
  needsTriggerLockout: boolean;
} {
  try {
    const storedLockout = localStorage.getItem(STORAGE_LOCKOUT_KEY);
    const storedAttempts = parseInt(
      localStorage.getItem(STORAGE_ATTEMPTS_KEY) || "0",
      10
    );

    if (storedLockout) {
      const lockoutUntil = parseInt(storedLockout, 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        return {
          isLocked: true,
          failedAttempts: MAX_ATTEMPTS,
          lockoutRemaining: formatRemainingTime(lockoutUntil),
          needsTriggerLockout: false,
        };
      } else {
        // Lockout expired — clean up
        localStorage.removeItem(STORAGE_LOCKOUT_KEY);
        localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
        return { isLocked: false, failedAttempts: 0, lockoutRemaining: "", needsTriggerLockout: false };
      }
    } else {
      if (storedAttempts >= MAX_ATTEMPTS) {
        return { isLocked: false, failedAttempts: storedAttempts, lockoutRemaining: "", needsTriggerLockout: true };
      }
      return { isLocked: false, failedAttempts: storedAttempts, lockoutRemaining: "", needsTriggerLockout: false };
    }
  } catch {
    return { isLocked: false, failedAttempts: 0, lockoutRemaining: "", needsTriggerLockout: false };
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Forgot password mode
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const [initialState] = useState(getInitialLockoutState);
  const [failedAttempts, setFailedAttempts] = useState(initialState.failedAttempts);
  const [isLocked, setIsLocked] = useState(initialState.isLocked);
  const [lockoutRemaining, setLockoutRemaining] = useState(initialState.lockoutRemaining);

  // If stored attempts >= MAX but no lockout was persisted yet, trigger lockout on mount
  useEffect(() => {
    if (initialState.needsTriggerLockout) {
      triggerLockout("admin");
    }
  }, [initialState.needsTriggerLockout]);

  // Update timer countdown
  useEffect(() => {
    if (!isLocked) return;

    const interval = setInterval(() => {
      const storedLockout = localStorage.getItem(STORAGE_LOCKOUT_KEY);
      if (storedLockout) {
        const lockoutUntil = parseInt(storedLockout, 10);
        const now = Date.now();
        if (lockoutUntil <= now) {
          // Expired
          localStorage.removeItem(STORAGE_LOCKOUT_KEY);
          localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
          setIsLocked(false);
          setFailedAttempts(0);
          setError(null);
          toast.success("Lockout period ended. You may try again.");
          clearInterval(interval);
        } else {
          updateRemainingTime(lockoutUntil);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked]);

  function updateRemainingTime(lockoutUntil: number) {
    setLockoutRemaining(formatRemainingTime(lockoutUntil));
  }

  async function triggerLockout(attemptedEmail: string) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    try {
      localStorage.setItem(STORAGE_LOCKOUT_KEY, lockoutUntil.toString());
      localStorage.setItem(STORAGE_ATTEMPTS_KEY, MAX_ATTEMPTS.toString());
    } catch {
      // LocalStorage fallback
    }

    setIsLocked(true);
    setFailedAttempts(MAX_ATTEMPTS);
    updateRemainingTime(lockoutUntil);

    const lockoutMsg =
      "Maximum 5 attempts exceeded. Login locked for 15 minutes. A security alert email has been sent to our Gmail.";
    setError(lockoutMsg);
    toast.error("Account locked! Security alert sent to Gmail.");

    // Send security alert email to Gmail
    try {
      await fetch("/api/login-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: attemptedEmail,
          attempts: MAX_ATTEMPTS,
        }),
      });
    } catch (err) {
      console.error("Failed to send login alert email:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLocked) {
      toast.error(
        `Login temporarily locked. Please wait ${lockoutRemaining} before trying again.`
      );
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await signInAdmin(email, password);
      // Clear failed attempts on successful login
      try {
        localStorage.removeItem(STORAGE_ATTEMPTS_KEY);
        localStorage.removeItem(STORAGE_LOCKOUT_KEY);
      } catch {
        // LocalStorage fallback
      }
      setFailedAttempts(0);
      toast.success("Signed in successfully!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      try {
        localStorage.setItem(STORAGE_ATTEMPTS_KEY, newAttempts.toString());
      } catch {
        // LocalStorage fallback
      }

      if (newAttempts >= MAX_ATTEMPTS) {
        await triggerLockout(email);
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        const msg = `Invalid credentials. Only ${remaining} attempt${
          remaining === 1 ? "" : "s"
        } remaining before account lockout.`;
        setError(msg);
        toast.error(
          `Invalid credentials! ${remaining} attempt${
            remaining === 1 ? "" : "s"
          } left.`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSendResetLink(e: React.FormEvent) {
    e.preventDefault();
    const targetEmail = resetEmail.trim() || email.trim();
    if (!targetEmail) {
      toast.error("Please enter your admin email address.");
      return;
    }

    setResetLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send reset link.");
      }

      setResetSent(true);
      toast.success("Password reset link sent to your email!");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to send reset link.";
      toast.error(msg);
    } finally {
      setResetLoading(false);
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
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] mb-3 shadow-lg shadow-[#d4af37]/20">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              priority
              unoptimized
            />
          </div>
          <h1 className="text-neutral-900 dark:text-white text-lg font-semibold tracking-wide">
            Wadan Electronics
          </h1>
          <p className="text-neutral-500 dark:text-[#888] text-xs mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl border p-8 bg-white dark:bg-[#111] backdrop-blur-xl shadow-xl dark:shadow-2xl transition-colors ${
            isLocked
              ? "border-red-500/30"
              : "border-neutral-200 dark:border-white/10"
          }`}
        >
          {isResetMode ? (
            /* Reset Password Mode */
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setResetSent(false);
                    }}
                    className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="text-neutral-900 dark:text-white font-medium text-lg">
                    Reset Password
                  </h2>
                </div>
              </div>

              {resetSent ? (
                <div className="space-y-4 py-2">
                  <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                        Reset Link Dispatched!
                      </p>
                      <p className="mt-1 text-emerald-700/90 dark:text-emerald-300/90 leading-relaxed">
                        A recovery link has been sent to{" "}
                        <strong className="font-semibold text-neutral-900 dark:text-white">
                          {resetEmail || email}
                        </strong>{" "}
                        using the mailer. Please check your inbox and spam folder.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                    Didn&apos;t receive it? Please verify your SMTP settings or wait a moment.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setResetSent(false)}
                      className="w-1/2 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-neutral-700 dark:text-neutral-200 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                    >
                      Send Again
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsResetMode(false);
                        setResetSent(false);
                      }}
                      className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendResetLink} className="space-y-4">
                  <p className="text-xs text-neutral-600 dark:text-[#aaa] leading-relaxed">
                    Enter your admin email below. A secure one-time password reset link will be generated and emailed directly to your inbox.
                  </p>

                  <div>
                    <label
                      htmlFor="reset-email"
                      className="block text-xs font-medium text-neutral-600 dark:text-[#888] uppercase tracking-widest mb-2"
                    >
                      Admin Email
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      required
                      disabled={resetLoading}
                      autoComplete="email"
                      value={resetEmail || email}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        setEmail(e.target.value);
                      }}
                      placeholder="admin@gmail.com"
                      className="admin-input disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full py-3 rounded-xl font-medium text-sm text-black transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: resetLoading
                        ? "rgba(212,175,55,0.6)"
                        : "linear-gradient(135deg,#d4af37,#b8941f)",
                      boxShadow: resetLoading
                        ? "none"
                        : "0 8px 24px rgba(212,175,55,0.25)",
                    }}
                  >
                    {resetLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Generating Link & Sending Email…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Reset Link
                      </span>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsResetMode(false)}
                      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      ← Back to sign in
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Standard Login Form */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-neutral-900 dark:text-white font-medium text-lg">Sign in</h2>
                {/* Attempt badge indicator */}
                <div
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                    isLocked
                      ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                      : failedAttempts > 0
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-[#888] border-neutral-200 dark:border-white/10"
                  }`}
                >
                  {isLocked
                    ? "Locked (0/5)"
                    : `${MAX_ATTEMPTS - failedAttempts}/${MAX_ATTEMPTS} attempts left`}
                </div>
              </div>

              {/* Lockout Warning Banner */}
              {isLocked && (
                <div className="mb-5 rounded-xl p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-red-500 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-300">
                      Account Temporarily Locked
                    </p>
                    <p className="mt-1 text-red-600/90 dark:text-red-400/90 leading-relaxed">
                      5 failed attempts exceeded. A security alert email has been sent
                      to our Gmail. Try again in:{" "}
                      <span className="font-mono font-bold text-neutral-900 dark:text-white">
                        {lockoutRemaining}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Active Error (when not locked) */}
              {error && !isLocked && (
                <div className="mb-4 rounded-xl p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="block text-xs font-medium text-neutral-600 dark:text-[#888] uppercase tracking-widest mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    disabled={isLocked || loading}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="admin-input disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-medium text-neutral-600 dark:text-[#888] uppercase tracking-widest"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setResetEmail(email);
                        setIsResetMode(true);
                      }}
                      className="text-xs text-[#d4af37] hover:underline transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    disabled={isLocked || loading}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="admin-input disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit */}
                <button
                  id="admin-login-submit"
                  type="submit"
                  disabled={loading || isLocked}
                  className="w-full py-3 rounded-xl font-medium text-sm text-black transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: isLocked
                      ? "rgba(239,68,68,0.2)"
                      : loading
                      ? "rgba(212,175,55,0.6)"
                      : "linear-gradient(135deg,#d4af37,#b8941f)",
                    color: isLocked ? "#ef4444" : "#000",
                    boxShadow:
                      loading || isLocked
                        ? "none"
                        : "0 8px 24px rgba(212,175,55,0.25)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Signing in…
                    </span>
                  ) : isLocked ? (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" />
                      Locked ({lockoutRemaining})
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        <p className="text-center text-neutral-500 dark:text-[#555] text-xs mt-6">
          © {new Date().getFullYear()} Wadan Electronics · Admin Portal (Strict 5 Attempts Protection)
        </p>
      </div>
    </div>
  );
}
