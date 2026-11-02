import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wadanelectrics.com";

  const staticRoutes = [
    "",
    "/collection",
    "/about",
    "/contact",
    "/privacy-policy",
    "/shipping-policy",
    "/refund-policy",
    "/terms-of-service",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryRoutes = [
    "electric-accessories",
    "solar-inverter",
    "lithium-battery",
    "fire-safety",
  ].map((slug) => ({
    url: `${baseUrl}/product-category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tagRoutes = [
    "solar-energy",
    "hybrid-inverter",
    "lifepo4-battery",
    "circuit-breaker",
    "fire-safety-equipment",
    "surge-protector",
  ].map((slug) => ({
    url: `${baseUrl}/product-tag/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...tagRoutes];
}
