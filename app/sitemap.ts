import type { MetadataRoute } from "next";
import { properties } from "./lib/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oliviana-imoveis.com.br";
  const routes = ["", "/imoveis", "/sobre", "/como-funciona", "/duvidas", "/contato"];
  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-07-28"),
    })),
    ...properties.map((property) => ({
      url: `${base}/imoveis/${property.slug}`,
      lastModified: new Date(property.createdAt),
    })),
  ];
}
