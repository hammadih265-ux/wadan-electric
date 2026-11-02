"use client";

import Link from "next/link";
import { Zap, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";

const categoryLinks = [
  {
    label: "Electric Accessories",
    href: "/collection?category=electric-accessories",
  },
  { label: "Solar Inverter", href: "/collection?category=solar-inverter" },
  { label: "Lithium Battery", href: "/collection?category=lithium-battery" },
  { label: "Fire Safety", href: "/collection?category=fire-safety" },
];

const companyLinks = [
  { label: "About Wadan Electrics", href: "/about" },
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
              <div className=" bg-white rounded-lg flex items-center justify-center">
                {/* <Zap className="w-4 h-4 fill-black" /> */}
                <Image
                  src="/logo.png"
                  alt="Logo"
                  unoptimized
                  width={100}
                  height={100}
                />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                WADAN ELECTRICS
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Leading provider of premium electrical accessories,
              high-efficiency solar inverters, lithium energy storage, and
              certified fire safety equipment across Pakistan.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Quality & Authenticity Guaranteed</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold tracking-widest text-white uppercase">
              CATEGORIES
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
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
                href="https://wa.me/923159686822"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+92 315 9686822 (WhatsApp)</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>contact@wadanelectrics.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Nationwide Shipping & Support in Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Wadan Electrics. All rights reserved.
          </p>
          <p className="text-[11px] text-neutral-500">
            Electric Accessories · Solar Inverters · Lithium Batteries · Fire
            Safety
          </p>
        </div>
      </div>
    </footer>
  );
}
