"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import {
  STORE_CONTACT,
  GlowingSocialButton,
} from "@/components/common/SocialIcons";

const solutionLinks = [
  {
    label: "Electric Accessories",
    href: "/collection?category=electric-accessories",
  },
  {
    label: "Solar & Energy Storage",
    href: "/collection?category=solar-energy-storage",
  },
  {
    label: "Home Automation",
    href: "/collection?category=home-automation",
  },
  {
    label: "Fire Safety & Protection",
    href: "/collection?category=fire-safety",
  },
];

const companyLinks = [
  { label: "About Wadan Electric Store", href: "/about" },
  { label: "Contact & Support", href: "/contact" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-300">
      <div className="container mx-auto px-6 py-14 max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-lg flex items-center justify-center p-1">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  
                  width={90}
                  height={90}
                />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                Wadan Electric Store
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Leading provider of premium electrical accessories,
              high-efficiency solar inverters, lithium energy storage, and
              certified fire safety equipment across Pakistan.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Quality & Authenticity Guaranteed</span>
            </div>

            {/* Social Channels with Glowing Light Burst on Click */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-white tracking-wide uppercase">
                Official Channels
              </p>
              <div className="flex items-center gap-3 pt-1">
                <GlowingSocialButton platform="tiktok" variant="icon-only" size="md" />
                <GlowingSocialButton platform="facebook" variant="icon-only" size="md" />
                <GlowingSocialButton platform="whatsapp" variant="icon-only" size="md" />
              </div>
            </div>
          </div>

          {/* Solutions & Product Lines */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              OUR SOLUTIONS
            </h3>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-400 transition hover:text-[#d4af37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              CUSTOMER SUPPORT
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-neutral-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              GET IN TOUCH
            </h3>
            <div className="space-y-3 text-xs text-neutral-400">
              <a
                href={STORE_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{STORE_CONTACT.phoneFormatted} (WhatsApp)</span>
              </a>
              <a
                href={`tel:${STORE_CONTACT.phone}`}
                className="flex items-center gap-2.5 hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{STORE_CONTACT.phone}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{STORE_CONTACT.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{STORE_CONTACT.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Wadan Electric Store. All rights reserved.
          </p>
          <p className="text-[11px] text-neutral-500">
            {STORE_CONTACT.address} · {STORE_CONTACT.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}
