import type { Metadata } from "next";
import SiteClient from "../components/site-client";

export const metadata: Metadata = {
  title: "Imóveis disponíveis | Oliviana Imóveis",
  description:
    "Catálogo de imóveis e quartos para locação em São Paulo com filtros por bairro, preço, tipo e comodidades.",
};

export default function PropertiesPage() {
  return <SiteClient page="catalog" />;
}
