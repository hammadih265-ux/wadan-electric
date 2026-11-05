"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  BatteryCharging,
  ShieldAlert,
  Truck,
  Activity,
  CheckCircle2,
  Zap,
  Gauge,
} from "lucide-react";

export default function Features() {
  return (
    <section className="my-16 sm:my-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between border-b border-neutral-200/80 pb-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Industrial Grade Standards</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950">
            Engineered For Reliability.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-500">
            Why solar installers, contractors, and industrial facilities across Pakistan rely on Wadan Electric Store.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs font-mono font-medium text-neutral-500">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>VERIFIED SPECIFICATIONS · 2026</span>
        </div>
      </div>

      {/* Bento Grid Layout (Bespoke Architecture) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {/* Bento 1: Solar & Hybrid Inverters (Span 7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 relative overflow-hidden rounded-3xl bg-neutral-950 text-white p-7 sm:p-9 border border-neutral-800 shadow-xl flex flex-col justify-between group hover:border-[#d4af37]/50 transition-all duration-300"
        >
          {/* Ambient Gold Glow & Tech Coordinate Grid */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-4 top-4 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            MOD // SOLAR-INV
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-[#d4af37] flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 fill-[#d4af37]/20" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d4af37] mb-2 uppercase tracking-wider">
              <span>Pure Sine Wave Inversion</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              Tier-1 MPPT Hybrid Solar Architecture
            </h3>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mb-6">
              Up to 98.8% conversion efficiency with advanced dual-tracker MPPT controllers. Engineered to seamlessly withstand extreme ambient summer heat, voltage drops, and sudden grid dropouts in Pakistan.
            </p>
          </div>

          {/* Micro Specs Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-900">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800">
              <Gauge className="w-3 h-3 text-[#d4af37]" />
              98.8% Peak Yield
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Dual MPPT
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800">
              <Activity className="w-3 h-3 text-blue-400" />
              Zero Grid Drop
            </span>
          </div>
        </motion.div>

        {/* Bento 2: LiFePO4 Energy Storage (Span 5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-5 relative overflow-hidden rounded-3xl bg-white p-7 sm:p-9 border border-neutral-200/90 shadow-sm flex flex-col justify-between group hover:border-[#d4af37]/60 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute right-4 top-4 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            SPEC // LIFEPO4
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-6 group-hover:bg-neutral-950 group-hover:text-[#d4af37] transition-all">
              <BatteryCharging className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">
              <span>Deep-Cycle Battery Tech</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">
              Grade-A LiFePO4 Cells & Active BMS
            </h3>

            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
              Rated for 6,000+ full discharge cycles with multi-tier cell balancing. Immune to thermal runaway and memory degradation unlike generic lead-acid batteries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-50 text-neutral-700 border border-neutral-200">
              6,000+ Cycles
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-50 text-neutral-700 border border-neutral-200">
              Zero Thermal Runaway
            </span>
          </div>
        </motion.div>

        {/* Bento 3: Certified Fire Safety (Span 5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:col-span-5 relative overflow-hidden rounded-3xl bg-white p-7 sm:p-9 border border-neutral-200/90 shadow-sm flex flex-col justify-between group hover:border-red-400/60 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute right-4 top-4 font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            SEC // HAZARD-PROT
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-red-600 mb-2 uppercase tracking-wider font-semibold">
              <span>Certified Suppression</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">
              Active Hazard & Fire Safety Systems
            </h3>

            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
              Industrial dry powder suppression extinguishers, automated optical smoke detectors, and emergency alarms designed to prevent electrical cabinet flashfires.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-red-50/50 text-red-700 border border-red-100">
              &lt; 2.5s Response
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-50 text-neutral-700 border border-neutral-200">
              NFPA & IEC Standards
            </span>
          </div>
        </motion.div>

        {/* Bento 4: Nationwide Logistics & Direct Engineering (Span 7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-7 relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-7 sm:p-9 border border-neutral-800 shadow-xl flex flex-col justify-between group hover:border-[#d4af37]/50 transition-all duration-300"
        >
          <div className="absolute right-4 top-4 font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            LOG // NATIONWIDE
          </div>

          <div>
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-[#d4af37] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d4af37] mb-2 uppercase tracking-wider">
              <span>Verified Logistics Network</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              Direct Engineering Consultation & Insured Delivery
            </h3>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mb-6">
              Get customized system sizing and product recommendations on WhatsApp. All orders packaged in heavy-duty crating and dispatched nationwide upon payment slip verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-900">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800">
              Payment Slip Verification
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800">
              WhatsApp Technical Line
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800">
              Heavy-Duty Crating
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
