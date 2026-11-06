"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Flame,
  MessageCircle,
  Wrench,
  CheckCircle2,
  ShieldCheck,
  FileText,
  MapPin,
  Phone,
} from "lucide-react";
import { Product } from "@/services/product.service";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import ProductCard from "@/components/common/product-card/ProductCard";
import { STORE_CONTACT } from "@/components/common/SocialIcons";

interface FeaturedShowcaseProps {
  featuredProducts?: Product[];
  upcomingProducts?: Product[];
}

interface EngineeringSolution {
  id: string;
  shortTitle: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  image: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  inquiryText: string;
}

const DEFAULT_ENGINEERING_SOLUTIONS: EngineeringSolution[] = [
  {
    id: "solar-inverter-10kw",
    shortTitle: "⚡ 10kW Solar Inverter",
    badge: "Precision Solar Engineering · Technical Specs",
    title: "10kW Industrial Hybrid Solar Inverter",
    tagline: "High-Yield Dual MPPT & Smart Grid-Tie Architecture",
    description:
      "Want technical specifications through our engineering team? Our certified electrical engineers deliver full single-line diagrams (SLD), peak efficiency curves, and custom solar sizing calculations for residential and commercial setups across Pakistan.",
    category: "Solar Inverter",
    image: "/categories/solar-inverter.svg",
    specs: [
      { label: "Rated Power", value: "10,000 Watts (10kW)" },
      { label: "MPPT Efficiency", value: "99.2% Real-World" },
      { label: "Battery Bus", value: "48V LiFePO4 / Lead-Acid" },
      { label: "Transfer Time", value: "< 10ms UPS Grade" },
    ],
    highlights: [
      "Certified datasheets with total harmonic distortion reports (THD < 3%)",
      "Single-line diagram (SLD) customized to your property's electrical load",
      "Direct consultation with Wadan Electric Store certified electrical engineers",
    ],
    inquiryText: "10kW Industrial Hybrid Solar Inverter Technical Specs",
  },
  {
    id: "lithium-storage-bank",
    shortTitle: "🔋 LiFePO4 Storage Bank",
    badge: "Energy Storage · Precision Sizing",
    title: "48V 100Ah / 200Ah LiFePO4 Lithium Storage Bank",
    tagline: "High-Cycle Prismatic Cell Architecture with Smart CAN/RS485 BMS",
    description:
      "Need accurate runtime calculations and battery bank sizing through our engineering department? We calculate depth of discharge (DoD), ambient thermal derating, and BMS communication protocols with your inverter for guaranteed 10+ year longevity.",
    category: "Lithium Battery",
    image: "/categories/lithium-battery.svg",
    specs: [
      { label: "Cycle Life", value: "6,000+ Cycles @ 80% DoD" },
      { label: "Cell Chemistry", value: "Grade-A Prismatic LiFePO4" },
      { label: "BMS Protocol", value: "CAN / RS485 Dual Bus" },
      { label: "Warranty", value: "5 Years Official Warranty" },
    ],
    highlights: [
      "Custom amp-hour (Ah) & kilowatt-hour (kWh) load matching",
      "Thermal safety analysis & cell balance verification reports",
      "Engineered plug-and-play installation schematics",
    ],
    inquiryText: "LiFePO4 Lithium Storage Bank Engineering Datasheet",
  },
  {
    id: "industrial-switchgear",
    shortTitle: "🛡️ AC/DC Protection Gear",
    badge: "Electrical Distribution · Safety Engineering",
    title: "Industrial AC/DC Distribution & Protection Gear",
    tagline: "Triple-Pole Breakers, Type II SPD Surge Suppressors & Custom DBs",
    description:
      "Ensure complete overvoltage, short-circuit, and lightning protection. Our engineers design certified distribution boxes (DB), selecting exact breaking capacities (kA) and trip curves tailored to your facility's transformers and solar arrays.",
    category: "Electric Accessories",
    image: "/categories/electric-accessories.svg",
    specs: [
      { label: "Breaking Capacity", value: "Up to 10kA Rated" },
      { label: "Surge Protection", value: "Class II / 40kA SPD" },
      { label: "Enclosure Rating", value: "IP65 Weather & Dust Proof" },
      { label: "Standards", value: "IEC 60947-2 Certified" },
    ],
    highlights: [
      "Calculated short-circuit breaking capacity for fault currents",
      "Surge protection zone (LPZ) design against lightning strikes",
      "Pre-wired, labeled, and tested distribution assemblies",
    ],
    inquiryText: "Industrial AC/DC Distribution & Protection Engineering Specs",
  },
  {
    id: "fire-suppression-systems",
    shortTitle: "🧯 Fire Safety Suppression",
    badge: "Fire Safety Compliance · Automated Defense",
    title: "Electrical Room Fire Safety & Suppression Systems",
    tagline: "Clean-Agent Extinguishers, Heat Sensors & Auto-Discharge Enclosures",
    description:
      "Protect high-voltage inverters, battery banks, and server rooms from electrical fire risks. Our safety team provides NFPA-compliant fire containment recommendations, automated thermal release devices, and certified suppression gear.",
    category: "Fire Safety",
    image: "/categories/fire-safety.svg",
    specs: [
      { label: "Activation Temp", value: "68°C / 93°C Thermal Bulb" },
      { label: "Agent Type", value: "Clean Agent / ABC Dry Chemical" },
      { label: "Discharge Time", value: "< 10 Seconds Rapid Flood" },
      { label: "Certification", value: "ISO & NFPA Standard Tested" },
    ],
    highlights: [
      "Electrical hazard risk audit & suppression sizing",
      "Residue-free clean agent options safe for electronics",
      "Complete installation diagrams & maintenance schedules",
    ],
    inquiryText: "Electrical Fire Safety & Suppression System Engineering Consultation",
  },
];

const fallbackFeaturedProducts: Product[] = [
  {
    id: "fallback-f-1",
    name: "Pure Sine Wave Hybrid Solar Inverter 6kW",
    price: 185000,
    compare_at_price: 210000,
    slug: "hybrid-solar-inverter-6kw",
    product_images: [{ id: "fb-img-2", image_url: "/categories/solar-inverter.svg", position: 0 }],
  } as unknown as Product,
  {
    id: "fallback-f-2",
    name: "LiFePO4 48V 100Ah Lithium Storage Battery",
    price: 320000,
    compare_at_price: 350000,
    slug: "lifepo4-48v-100ah-battery",
    product_images: [{ id: "fb-img-3", image_url: "/categories/lithium-battery.svg", position: 0 }],
  } as unknown as Product,
  {
    id: "fallback-f-3",
    name: "Triple Pole AC/DC Molded Circuit Breaker",
    price: 14500,
    compare_at_price: 16500,
    slug: "triple-pole-circuit-breaker",
    product_images: [{ id: "fb-img-4", image_url: "/categories/electric-accessories.svg", position: 0 }],
  } as unknown as Product,
  {
    id: "fallback-f-4",
    name: "Automatic Cabinet Dry Powder Fire Extinguisher",
    price: 8500,
    compare_at_price: 9800,
    slug: "automatic-cabinet-fire-extinguisher",
    product_images: [{ id: "fb-img-5", image_url: "/categories/fire-safety.svg", position: 0 }],
  } as unknown as Product,
];

export default function FeaturedShowcase({
  featuredProducts = [],
  upcomingProducts = [],
}: FeaturedShowcaseProps) {
  const addItemToCart = useCartStore((s) => s.addItem);
  const [selectedSolutionIdx, setSelectedSolutionIdx] = useState(0);
  const [upcomingImgLoaded, setUpcomingImgLoaded] = useState(false);
  const [upcomingImgSrc, setUpcomingImgSrc] = useState<string | null>(null);

  // Combine any real Supabase upcoming products with engineering solutions
  const solutions = useMemo(() => {
    if (upcomingProducts && upcomingProducts.length > 0) {
      const dbSolutions: EngineeringSolution[] = upcomingProducts.map((p) => ({
        id: String(p.id),
        shortTitle: `⚡ ${p.name.split(" ").slice(0, 3).join(" ")}`,
        badge: "Next-Gen Engineering · Upcoming Release",
        title: p.name,
        tagline: "Engineered by Wadan Electric Store Specialists",
        description:
          p.description ||
          "Looking for verified electrical ratings, custom schematics, or load sizing? Consult our certified electrical engineers for complete datasheets and project diagrams.",
        category: "Upcoming Hardware",
        image: p.product_images?.[0]?.image_url || "/placeholder.svg",
        specs: [
          { label: "Hardware Status", value: "Engineering Release" },
          { label: "Technical Specs", value: "Verified by Engineers" },
          { label: "Consultation", value: "Available on WhatsApp" },
          { label: "Dispatch Area", value: "Nationwide Pakistan" },
        ],
        highlights: [
          "Complete engineering datasheets & electrical schematics",
          "Custom load sizing & compatibility analysis",
          "Direct consultation with Wadan Electric Store engineers",
        ],
        inquiryText: `${p.name} Technical Specs & Engineering Consultation`,
      }));
      return [...dbSolutions, ...DEFAULT_ENGINEERING_SOLUTIONS];
    }
    return DEFAULT_ENGINEERING_SOLUTIONS;
  }, [upcomingProducts]);

  const currentSolution = solutions[selectedSolutionIdx] || solutions[0];

  const activeFeatured =
    featuredProducts.length > 0 ? featuredProducts : fallbackFeaturedProducts;

  const handleAddToCart = (product: { id: string | number; name: string; price: number; image: string }) => {
    addItemToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  const currentImageUrl =
    upcomingImgSrc || currentSolution?.image || "/placeholder.svg";

  const whatsappInquiryUrl = `https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
    `Hi Wadan Electric Store! I want technical specifications and engineering consultation for: ${currentSolution.title}. Please provide the engineering datasheet and load sizing guidance.`
  )}`;

  return (
    <section className="container mx-auto my-14 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* ── Engineering Technical Specs & Spotlight Section ── */}
      <div className="mb-16 relative overflow-hidden rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-2xl">
        {/* Ambient Spotlight Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom,rgba(37,244,238,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* ── Engineering Selector Navigation Bar ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#d4af37]">
              <Wrench className="w-4 h-4" />
              <span>Technical Specs Through Our Engineering</span>
            </div>

            {/* Interactive Solution Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {solutions.map((item, idx) => {
                const isActive = selectedSolutionIdx === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedSolutionIdx(idx);
                      setUpcomingImgSrc(null);
                      setUpcomingImgLoaded(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? "bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-md shadow-[#d4af37]/20"
                        : "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Main Showcase Grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSolution.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Tech Overview & Engineering Specs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#d4af37] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentSolution.badge}</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {currentSolution.title}
                </h2>

                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#d4af37]">
                  {currentSolution.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
                  {currentSolution.description}
                </p>

                {/* Technical Specifications Grid */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
                  {currentSolution.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm"
                    >
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 truncate">
                        {spec.label}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Engineering Highlights */}
                <div className="mt-4 space-y-1.5 max-w-xl">
                  {currentSolution.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 text-xs text-neutral-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Call To Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8941f] px-5 py-3 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 transition-all hover:brightness-110 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Request Specs on WhatsApp</span>
                  </a>

                  <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/30"
                  >
                    <Wrench className="w-4 h-4 text-[#d4af37]" />
                    <span>Consult Our Engineers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Preview & Engineering Verification Badge */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 shadow-xl">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center">
                    {!upcomingImgLoaded && (
                      <div className="absolute inset-0 z-0 bg-neutral-900 animate-pulse rounded-xl" />
                    )}

                    <Image
                      src={currentImageUrl}
                      alt={currentSolution.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={`object-contain p-6 transition-all duration-700 hover:scale-105 ${
                        upcomingImgLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setUpcomingImgLoaded(true)}
                      onError={() => {
                        setUpcomingImgSrc("/placeholder.svg");
                        setUpcomingImgLoaded(true);
                      }}
                    />

                    {/* Top Right: Verified Engineering Badge */}
                    <div className="absolute top-3 right-3 rounded-xl bg-black/85 px-3 py-1.5 text-[11px] font-mono font-bold text-[#d4af37] backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Certified Specs</span>
                    </div>

                    {/* Bottom Category Pill */}
                    <div className="absolute bottom-3 left-3 rounded-xl bg-black/85 px-3 py-1.5 text-[11px] font-mono text-neutral-300 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-md">
                      <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{currentSolution.category}</span>
                    </div>
                  </div>
                </div>

                {/* Store Physical Verification Strip */}
                <div className="mt-3 text-[11px] text-neutral-400 flex flex-wrap items-center justify-center gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span>{STORE_CONTACT.address}</span>
                  </span>
                  <span className="text-neutral-600 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-[#d4af37]" />
                    <span>{STORE_CONTACT.phoneFormatted}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Featured Products Section ── */}
      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
              <Flame className="w-4 h-4" />
              <span>Handpicked Exclusives</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/collection"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#d4af37] transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeFeatured.map((p) => {
            const imgUrl =
              p.product_images?.[0]?.image_url || "/placeholder.svg";
            const isSale = p.compare_at_price
              ? p.compare_at_price > p.price
              : false;

            return (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  image: imgUrl,
                  price: p.price,
                  oldPrice: p.compare_at_price ?? undefined,
                  sale: isSale,
                }}
                onAddToCart={(cardProduct) =>
                  handleAddToCart({
                    id: cardProduct.id,
                    name: cardProduct.name,
                    price: cardProduct.price,
                    image: cardProduct.image,
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
