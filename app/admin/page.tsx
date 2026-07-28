import type { Metadata } from "next";
import SiteClient from "../components/site-client";

export const metadata: Metadata = {
  title: "Painel administrativo | Oliviana Imóveis",
  description: "Área administrativa para gestão de imóveis, contatos e informações do site.",
};

export default function AdminPage() {
  return <SiteClient page="admin" />;
}
