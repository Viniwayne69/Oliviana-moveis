import type { Metadata } from "next";
import SiteClient from "./components/site-client";

export const metadata: Metadata = {
  title: "Oliviana Imóveis | Imóveis e quartos para locação em São Paulo",
  description:
    "Encontre imóveis e quartos para locação em regiões estratégicas de São Paulo, com informações claras e atendimento direto.",
};

export default function Home() {
  return <SiteClient page="home" />;
}
