import type { Metadata } from "next";
import SiteClient from "../components/site-client";

export const metadata: Metadata = {
  title: "Como funciona | Oliviana Imóveis",
  description: "Entenda as etapas para escolher, visitar, analisar documentação, assinar contrato e organizar sua mudança.",
};

export default function ProcessPage() {
  return <SiteClient page="process" />;
}
