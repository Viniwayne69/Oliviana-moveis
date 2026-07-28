import type { Metadata } from "next";
import SiteClient from "../components/site-client";

export const metadata: Metadata = {
  title: "Contato | Oliviana Imóveis",
  description: "Envie uma mensagem para a Oliviana Imóveis ou fale diretamente pelo WhatsApp sobre um imóvel de interesse.",
};

export default function ContactPage() {
  return <SiteClient page="contact" />;
}
