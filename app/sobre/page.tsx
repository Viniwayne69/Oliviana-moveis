import type { Metadata } from "next";
import SiteClient from "../components/site-client";

export const metadata: Metadata = {
  title: "Sobre a Oliviana | Oliviana Imóveis",
  description: "Conheça a forma de atendimento da Oliviana Martins de Lira na administração e locação de imóveis em São Paulo.",
};

export default function AboutPage() {
  return <SiteClient page="about" />;
}
