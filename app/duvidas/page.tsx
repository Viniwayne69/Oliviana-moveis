import type { Metadata } from "next";
import SiteClient from "../components/site-client";

export const metadata: Metadata = {
  title: "Dúvidas frequentes | Oliviana Imóveis",
  description: "Perguntas frequentes sobre documentos, caução, contas incluídas, visitas, contrato, regras e reserva do imóvel.",
};

export default function FaqPage() {
  return <SiteClient page="faq" />;
}
