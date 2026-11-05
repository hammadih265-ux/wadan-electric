import React from "react";

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

