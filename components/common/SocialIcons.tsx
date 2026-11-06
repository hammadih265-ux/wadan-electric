"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const STORE_CONTACT = {
  phone: "03139235476",
  phoneFormatted: "+92 313 9235476",
  whatsappNumber: "923139235476",
  whatsappUrl: "https://wa.me/923139235476",
  address: "Koragh Chowk By Pass Road Mardan",
  city: "Mardan",
  tiktok: "https://www.tiktok.com/@wadan.electric.ma?_r=1&_t=ZS-9B7iVvNEBHh",
  facebook: "https://www.facebook.com/share/1AAASvmr29/?mibextid=wwXIfr",
  email: "wadanelectrics@gmail.com",
};

// ── BRAND SVG ICONS ──────────────────────────────────────────────────────────

export function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.32-6.33V9.17a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.6z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.5 0-2.97-.4-4.26-1.16l-.31-.18-3.16.83.84-3.08-.2-.32a8.17 8.17 0 0 1-1.25-4.33c0-4.52 3.68-8.19 8.2-8.19 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.19-8.06 8.23zm4.5-6.14c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
    </svg>
  );
}

// ── PARTICLE BURST LIGHT ANIMATION ──────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface BurstInstance {
  id: number;
  particles: Particle[];
  shockColor: string;
  flashColor: string;
}

const PLATFORM_CONFIGS = {
  tiktok: {
    name: "TikTok",
    href: STORE_CONTACT.tiktok,
    primaryColor: "#25F4EE", // Neon Cyan
    secondaryColor: "#FE2C55", // Neon Magenta
    accentGlow: "rgba(37, 244, 238, 0.4)",
    particleColors: [
      "#25F4EE",
      "#FE2C55",
      "#00F2FE",
      "#FF007F",
      "#FFFFFF",
      "#25F4EE",
      "#FE2C55",
      "#FFFFFF",
    ],
    bgClass: "bg-neutral-950 border-neutral-800 text-white",
    idleGlowStyle: {
      boxShadow:
        "-2px -2px 14px rgba(37, 244, 238, 0.35), 2px 2px 14px rgba(254, 44, 85, 0.4)",
    },
    hoverGlowStyle: {
      boxShadow:
        "-3px -3px 24px rgba(37, 244, 238, 0.7), 3px 3px 24px rgba(254, 44, 85, 0.75), 0 0 12px rgba(255, 255, 255, 0.5)",
    },
  },
  facebook: {
    name: "Facebook",
    href: STORE_CONTACT.facebook,
    primaryColor: "#1877F2", // Official Facebook Blue
    secondaryColor: "#60A5FA", // Sky Blue
    accentGlow: "rgba(24, 119, 242, 0.55)",
    particleColors: [
      "#1877F2",
      "#3B82F6",
      "#60A5FA",
      "#93C5FD",
      "#FFFFFF",
      "#1D4ED8",
      "#38BDF8",
      "#FFFFFF",
    ],
    bgClass: "bg-[#1877F2] border-blue-400/40 text-white",
    idleGlowStyle: {
      boxShadow:
        "0 0 14px rgba(24, 119, 242, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    hoverGlowStyle: {
      boxShadow:
        "0 0 26px rgba(24, 119, 242, 0.8), 0 0 12px rgba(96, 165, 250, 0.9), 0 0 40px rgba(24, 119, 242, 0.4)",
    },
  },
  whatsapp: {
    name: "WhatsApp",
    href: STORE_CONTACT.whatsappUrl,
    primaryColor: "#25D366", // Official WhatsApp Green
    secondaryColor: "#34D399", // Emerald Light
    accentGlow: "rgba(37, 211, 102, 0.55)",
    particleColors: [
      "#25D366",
      "#10B981",
      "#34D399",
      "#6EE7B7",
      "#FFFFFF",
      "#059669",
      "#A7F3D0",
      "#FFFFFF",
    ],
    bgClass: "bg-[#25D366] border-emerald-300/40 text-white",
    idleGlowStyle: {
      boxShadow:
        "0 0 14px rgba(37, 211, 102, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    hoverGlowStyle: {
      boxShadow:
        "0 0 26px rgba(37, 211, 102, 0.85), 0 0 12px rgba(52, 211, 153, 0.9), 0 0 40px rgba(37, 211, 102, 0.4)",
    },
  },
};

export type SocialPlatform = keyof typeof PLATFORM_CONFIGS;

export interface GlowingSocialButtonProps {
  platform: SocialPlatform;
  variant?: "icon-only" | "pill" | "banner";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  showLightsOnClick?: boolean;
}

export function GlowingSocialButton({
  platform,
  variant = "pill",
  size = "md",
  label,
  className = "",
  showLightsOnClick = true,
}: GlowingSocialButtonProps) {
  const [bursts, setBursts] = useState<BurstInstance[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const config = PLATFORM_CONFIGS[platform];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!showLightsOnClick) return;

    // Generate radial light sparks
    const particleCount = 12;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i * 360) / particleCount + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const distance = 40 + Math.random() * 35; // shoot out 40px to 75px
      const color =
        config.particleColors[i % config.particleColors.length];

      particles.push({
        id: i,
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
        size: Math.random() > 0.4 ? 5 : 7,
        color,
      });
    }

    const newBurst: BurstInstance = {
      id: Date.now() + Math.random(),
      particles,
      shockColor: config.primaryColor,
      flashColor: config.secondaryColor,
    };

    setBursts((prev) => [...prev, newBurst]);

    // Clean up particles after animation completes
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 750);
  };

  // Dimensions based on size
  const sizeClasses = {
    sm: variant === "icon-only" ? "w-8 h-8 rounded-lg" : "px-3 py-1.5 text-xs rounded-xl gap-1.5",
    md: variant === "icon-only" ? "w-10 h-10 rounded-xl" : "px-4 py-2.5 text-xs sm:text-sm rounded-xl gap-2",
    lg: variant === "icon-only" ? "w-12 h-12 rounded-2xl" : "px-5 py-3 text-sm font-semibold rounded-2xl gap-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const IconComponent =
    platform === "tiktok"
      ? TikTokIcon
      : platform === "facebook"
      ? FacebookIcon
      : WhatsAppIcon;

  const defaultLabel =
    label ??
    (platform === "tiktok"
      ? "TikTok Channel"
      : platform === "facebook"
      ? "Facebook Page"
      : "WhatsApp Helpline");

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* ── AMBIENT BREATHING GLOW (BEHIND BUTTON) ── */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.9 : 0.45,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={isHovered ? config.hoverGlowStyle : config.idleGlowStyle}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
      />

      {/* ── THE INTERACTIVE BUTTON ── */}
      <motion.a
        href={config.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
        className={`relative z-10 inline-flex items-center justify-center font-bold tracking-wide select-none border transition-all duration-300 overflow-visible group ${config.bgClass} ${sizeClasses[size]} ${className}`}
        aria-label={`${config.name} Official Channel`}
      >
        {/* TikTok Dual Cyan/Magenta Neon Border Gradient */}
        {platform === "tiktok" && (
          <span
            className="absolute inset-0 rounded-xl pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,244,238,0.3) 0%, transparent 40%, rgba(254,44,85,0.4) 100%)",
            }}
          />
        )}

        {/* Shimmer Sheen on Hover */}
        <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </span>

        {/* Icon & Label */}
        <span className="relative z-10 flex items-center justify-center drop-shadow-md">
          <IconComponent className={iconSizes[size]} />
        </span>

        {variant !== "icon-only" && (
          <span className="relative z-10 truncate drop-shadow-sm font-semibold">
            {defaultLabel}
          </span>
        )}
      </motion.a>

      {/* ── LIGHTS BURST ANIMATION ON CLICK ── */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <React.Fragment key={burst.id}>
            {/* 1. Core Light Flare Flash */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0.95 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                background: `radial-gradient(circle, ${burst.flashColor} 0%, rgba(255,255,255,0.8) 40%, transparent 70%)`,
              }}
              className="absolute inset-0 pointer-events-none rounded-2xl z-20"
            />

            {/* 2. Expanding Shockwave Halo */}
            <motion.span
              initial={{ scale: 0.6, opacity: 1 }}
              animate={{ scale: 2.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderColor: burst.shockColor,
                boxShadow: `0 0 20px ${burst.shockColor}, inset 0 0 15px ${burst.shockColor}`,
              }}
              className="absolute inset-0 rounded-2xl border-2 pointer-events-none z-20"
            />

            {/* 3. Outward Light Rays / Particles */}
            {burst.particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  scale: [1.2, 1.6, 0],
                  opacity: [1, 0.9, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}`,
                }}
                className="absolute pointer-events-none rounded-full z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            ))}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── REUSABLE GLOWING SOCIAL CHANNELS SECTION ─────────────────────────────────

export interface GlowingSocialSectionProps {
  className?: string;
  variant?: "compact" | "cards" | "banner";
  showTitle?: boolean;
}

export function GlowingSocialSection({
  className = "",
  variant = "cards",
  showTitle = true,
}: GlowingSocialSectionProps) {
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <GlowingSocialButton platform="tiktok" variant="icon-only" size="md" />
        <GlowingSocialButton platform="facebook" variant="icon-only" size="md" />
        <GlowingSocialButton platform="whatsapp" variant="icon-only" size="md" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-100/30 p-6 sm:p-8 text-center shadow-lg ${className}`}
    >
      {/* Ambient background light bursts */}
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

      {showTitle && (
        <div className="relative z-10 mb-6 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-pink-500/15 text-neutral-800 border border-neutral-300/60 mb-2.5 shadow-sm">
            <span>Official Community & Live Demos</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
            Connect With Wadan Electric Store
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Follow our verified channels for real hardware unboxings, solar load tests, and instant WhatsApp technical inquiries.
          </p>
        </div>
      )}

      {/* Glowing Action Buttons */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <GlowingSocialButton platform="tiktok" variant="pill" size="md" />
        <GlowingSocialButton platform="facebook" variant="pill" size="md" />
        <GlowingSocialButton platform="whatsapp" variant="pill" size="md" />
      </div>

      <p className="relative z-10 mt-4 text-[11px] text-neutral-400 font-mono">
        Click any channel to test the electric lights animation &amp; open official page
      </p>
    </div>
  );
}
