import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import ToasterClient from "@/components/common/ToasterClient";

// Heading font: Outfit — modern, geometric, authoritative high-tech feel
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// Body font: Plus Jakarta Sans — award-winning clean readability
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wadanelectrics.com"),
  title: {
    default:
      "Wadan Electrics | Electric Accessories, Solar Inverter, Lithium Battery & Fire Safety",
    template: "%s | Wadan Electrics",
  },
  description:
    "Wadan Electrics supplies premium Electric Accessories, high-efficiency Solar Inverters, durable LiFePO4 Lithium Batteries, and certified Fire Safety equipment in Pakistan. Quality-tested power & protection solutions.",
  keywords: [
    "Wadan Electrics",
    "Electric Accessories",
    "Solar Inverter",
    "Lithium Battery",
    "Fire Safety",
    "Hybrid Solar Inverter Pakistan",
    "LiFePO4 Lithium Battery",
    "Solar Energy Systems",
    "Fire Alarm & Suppression",
    "Circuit Breakers and Distribution",
    "Industrial Electrical Accessories",
  ],
  authors: [{ name: "Wadan Electrics", url: "https://wadanelectrics.com" }],
  creator: "Wadan Electrics",
  publisher: "Wadan Electrics",
  category: "Electronics, Solar Power & Safety Equipment",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://wadanelectrics.com",
    siteName: "Wadan Electrics",
    title:
      "Wadan Electrics | Electric Accessories, Solar Inverter, Lithium Battery & Fire Safety",
    description:
      "Your trusted source for premium Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety systems. Quality-tested products with nationwide delivery.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Wadan Electrics — Power, Solar & Safety Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Wadan Electrics | Electric Accessories, Solar Inverter, Lithium Battery & Fire Safety",
    description:
      "Premium Electric Accessories, Solar Inverters, Lithium Batteries & Fire Safety equipment with nationwide delivery.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wadanelectrics.com/#organization",
      name: "Wadan Electrics",
      url: "https://wadanelectrics.com",
      logo: "https://wadanelectrics.com/logo.png",
      description:
        "Trusted supplier of Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety solutions in Pakistan.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92 315 9686822",
        contactType: "customer service",
        availableLanguage: ["English", "Urdu"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://wadanelectrics.com/#website",
      url: "https://wadanelectrics.com",
      name: "Wadan Electrics",
      publisher: {
        "@id": "https://wadanelectrics.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://wadanelectrics.com/collection?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        plusJakartaSans.variable,
        outfit.variable,
      )}
    >
      <head>
        <link
          rel="preconnect"
          href="https://wqioxoqrolqezrasgbfu.supabase.co"
        />
        <link
          rel="dns-prefetch"
          href="https://wqioxoqrolqezrasgbfu.supabase.co"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <QueryProvider>{children}</QueryProvider>
        <ToasterClient />
      </body>
    </html>
  );
}
