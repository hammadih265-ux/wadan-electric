"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Truck,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  STORE_CONTACT,
  GlowingSocialSection,
} from "@/components/common/SocialIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
};

const pillars = [
  {
    icon: Zap,
    title: "Technical Consultation",
    description:
      "Expert assistance in sizing Solar Inverters, Lithium Battery banks, and Electric Accessories.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Safety",
    description:
      "Genuine, factory-tested Fire Safety equipment and industrial-grade electrical components.",
  },
  {
    icon: Truck,
    title: "Nationwide Dispatch",
    description:
      "Fast, insured delivery across Mardan, Peshawar, Lahore, Karachi, Islamabad, and all cities in Pakistan.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.15)_0%,transparent_70%)]" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 mb-5"
          >
            <span>Customer Care & Quotations</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">
              Wadan Electric Store
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="max-w-2xl mx-auto mt-5 text-base sm:text-lg text-neutral-400 leading-relaxed"
          >
            Have a question about solar systems, lithium storage, electrical distribution, or fire safety? Our dedicated support team is ready to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* WhatsApp & Call */}
            <motion.a
              whileHover={{ y: -6 }}
              href={STORE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#25D366]/40 transition-all text-center block group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#25D366] flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                WhatsApp & Direct Call
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                Fastest response for pricing & payment slips
              </p>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                {STORE_CONTACT.phoneFormatted}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block font-mono">
                {STORE_CONTACT.phone}
              </span>
            </motion.a>

            {/* Email */}
            <motion.a
              whileHover={{ y: -6 }}
              href={`mailto:${STORE_CONTACT.email}`}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 transition-all text-center block group"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#d4af37] flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                Email Inquiries
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                Corporate quotes & technical specs
              </p>
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 block truncate">
                {STORE_CONTACT.email}
              </span>
            </motion.a>

            {/* Location */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 transition-all text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                Store & Physical Office
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                Main Showroom & Distribution Hub
              </p>
              <span className="text-sm font-bold text-neutral-900 dark:text-white leading-relaxed block">
                {STORE_CONTACT.address}
              </span>
            </motion.div>
          </div>

          {/* Glowing Social Channels Section */}
          <div className="mt-12">
            <GlowingSocialSection />
          </div>
        </div>
      </section>

      {/* Support Values */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
              OUR COMMITMENT
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mt-2">
              Why Work With Wadan Electric Store?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-6 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/60"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 text-[#d4af37] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
